import { InstallProviderOptions } from "@slack/bolt";
import { Installation } from "../db/models";
import { Installation as SlackInstallation } from "@slack/bolt";

export const installationStore: InstallProviderOptions["installationStore"] = {
  storeInstallation: async (installation) => {
    const { enterprise, team, user, isEnterpriseInstall } = installation;
    if (isEnterpriseInstall && enterprise !== undefined) {
      const installationData = await Installation.findOne({
        "enterprise.id": enterprise.id,
      });
      if (installationData) {
        return;
      }
      await new Installation(installation).save();
      return;
    }
    if (team !== undefined) {
      const installationData = await Installation.findOne({
        "team.id": team.id,
      });

      if (installationData) {
        return;
      }

      await new Installation(installation).save();
      return;
    }

    throw new Error("Failed saving installation data to installationStore");
  },
  fetchInstallation: async (installQuery) => {
    if (
      installQuery.isEnterpriseInstall &&
      installQuery.enterpriseId !== undefined
    ) {
      // handle org wide app installation lookup
      return (await Installation.findOne({
        "enterprise.id": installQuery.enterpriseId,
      })) as SlackInstallation<"v2", true>;
    }
    if (installQuery.teamId !== undefined) {
      return (await Installation.findOne({
        "team.id": installQuery.teamId,
      })) as SlackInstallation<"v2", false>;
    }
    throw new Error("Failed fetching installation");
  },
  deleteInstallation: async (installQuery) => {
    if (
      installQuery.isEnterpriseInstall &&
      installQuery.enterpriseId !== undefined
    ) {
      // org wide app installation deletion
      await Installation.deleteOne({
        "enterprise.id": installQuery.enterpriseId,
      });
      return;
    }
    if (installQuery.teamId !== undefined) {
      // single team app installation deletion
      await Installation.deleteOne({
        "team.id": installQuery.teamId,
      });
      return;
    }
    throw new Error("Failed to delete installation");
  },
};
