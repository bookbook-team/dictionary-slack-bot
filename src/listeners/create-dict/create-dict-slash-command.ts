import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { lowDb } from "../../db/lowdb";
import { CREATE_DICT_CALLBACK_ID } from "../constants";
import { openDictModal } from "../open-dict-modal";

export const createDictCommandLinstener: Middleware<
  SlackCommandMiddlewareArgs
> = async ({ body, ack, command, client }) => {
  await ack({ response_type: "ephemeral", text: "wait..." });

  const word = await lowDb.getOne("words", { title: command.text });
  if (word) {
    await client.chat.postEphemeral({
      text: `the word '${word.title}' is already created`,
      user: body.user.id,
      channel: body.channel?.id ?? "",
    });
    return;
  }

  await openDictModal({
    triggerId: body.trigger_id,
    wordTitle: body.text,
    callbackId: CREATE_DICT_CALLBACK_ID,
    client,
  });
};
