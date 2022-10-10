import { Installation as SlackInstallation } from "@slack/bolt";

export type Installation<IsEnterpriseInstall extends boolean> =
  SlackInstallation<"v2", IsEnterpriseInstall>;
