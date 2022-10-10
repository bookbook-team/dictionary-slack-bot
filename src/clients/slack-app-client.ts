import { App as SlackApp, ExpressReceiver } from "@slack/bolt";
import { installationStore } from "./installation-store";

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? "",
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: [
    "app_mentions:read",
    "channels:history",
    "chat:write",
    "chat:write.customize",
    "chat:write.public",
    "commands",
    "groups:history",
    "im:history",
    "im:read",
    "im:write",
    "mpim:history",
  ],
  installerOptions: {
    stateVerification: false,
    directInstall: true,
  },
  installationStore,
});

export const slackAppClient = new SlackApp({
  // socketMode: true,
  receiver,
});
