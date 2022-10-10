import { App as SlackApp, HTTPReceiver, LogLevel } from "@slack/bolt";

export const slackAppClient = new SlackApp({
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // socketMode: true,
  port: Number(process.env.PORT) || 3000,
});
