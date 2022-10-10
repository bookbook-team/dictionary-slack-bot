import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { lowDb } from "../../db/lowdb";
import { UPDATE_DICT_CALLBACK_ID } from "../constants";
import { openDictModal } from "../open-dict-modal";

export const updateDictCommandLinstener: Middleware<
  SlackCommandMiddlewareArgs
> = async ({ body, ack, client }) => {
  await ack({ response_type: "ephemeral", text: "wait..." });

  const word = await lowDb.getOne("words", { title: body.text });
  if (!word) {
    await client.chat.postEphemeral({
      text: `The word '${body.text}' is not in my dictionary`,
      user: body.user_id,
      channel: body.channel_id,
    });
    return;
  }

  await openDictModal({
    triggerId: body.trigger_id,
    wordTitle: body.text,
    modal: {
      title: "update word",
      submitButtonText: "update",
      defaultValue: word.desc,
    },
    callbackId: UPDATE_DICT_CALLBACK_ID,
    client,
  });
};
