import { InstallProviderOptions } from "@slack/bolt";
import { lowDb } from "../db/lowdb";
import { Installation } from "../types/installation";

export const installationStore: InstallProviderOptions["installationStore"] = {
  storeInstallation: async (installation) => {
    const { enterprise, team, user, isEnterpriseInstall } = installation;
    if (isEnterpriseInstall && enterprise !== undefined) {
      const installation = await lowDb.getOne("installations", {
        enterprise: { id: enterprise.id },
      });
      if (installation) {
        return;
      }
      return await lowDb.save(
        "installations",
        installation as unknown as Installation<true>
      );
    }
    if (team !== undefined) {
      const installation = await lowDb.getOne("installations", {
        team: { id: team.id },
      });
      if (installation) {
        return;
      }

      return await lowDb.save(
        "installations",
        installation as unknown as Installation<false>
      );
    }

    throw new Error("Failed saving installation data to installationStore");
  },
  fetchInstallation: async (installQuery) => {
    if (
      installQuery.isEnterpriseInstall &&
      installQuery.enterpriseId !== undefined
    ) {
      // handle org wide app installation lookup
      return (await lowDb.getOne("installations", {
        enterprise: { id: installQuery.enterpriseId },
      })) as Installation<true>;
    }
    if (installQuery.teamId !== undefined) {
      return (await lowDb.getOne("installations", {
        team: { id: installQuery.teamId },
      })) as Installation<false>;
    }
    throw new Error("Failed fetching installation");
  },
  deleteInstallation: async (installQuery) => {
    if (
      installQuery.isEnterpriseInstall &&
      installQuery.enterpriseId !== undefined
    ) {
      // org wide app installation deletion
      return await lowDb.delete("installations", {
        enterprise: { id: installQuery.enterpriseId },
      });
    }
    if (installQuery.teamId !== undefined) {
      // single team app installation deletion
      return await lowDb.delete("installations", {
        team: { id: installQuery.teamId },
      });
    }
    throw new Error("Failed to delete installation");
  },
};
