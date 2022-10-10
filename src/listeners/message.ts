import { KnownBlock, Middleware, SlackEventMiddlewareArgs } from "@slack/bolt";
import { lowDb } from "../db/lowdb";
import { CREATE_DICT_BUTTON_CALLBACK_ID } from "./constants";

const SLACK_APP_ID = process.env.SLACK_APP_ID;
const SLACK_APP_NAME = process.env.SLACK_APP_NAME;

export const allMessageLinstener: Middleware<
  SlackEventMiddlewareArgs<"app_mention">
> = async ({ event, client }) => {
  const title = event.text.replace(`<@${SLACK_APP_ID}>`, "").trim();
  if (!title) {
    const fallbackMessage =
      `how to call ${SLACK_APP_NAME}: ` +
      "`" +
      `@${SLACK_APP_NAME} <word>` +
      "`";
    await client.chat.postMessage({
      text: SLACK_APP_NAME,
      blocks: [
        { type: "section", text: { type: "mrkdwn", text: fallbackMessage } },
      ],
      channel: event.channel,
    });

    return;
  }

  const word = await lowDb.getOne("words", { title });

  const blocks: KnownBlock[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: word?.desc
          ? `*${word?.title}*\n${word?.desc}`
          : "hmmm... I don't know",
      },
    },
  ];

  if (!word?.desc) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "create word", emoji: true },
          value: title,
          action_id: CREATE_DICT_BUTTON_CALLBACK_ID,
        },
      ],
    });
  }

  await client.chat.postMessage({
    text: `create word`,
    blocks,
    channel: event.channel,
  });
};
