import { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Word } from "../../db/models";
import { CREATE_DICT_CALLBACK_ID } from "../constants";
import { openDictModal } from "../open-dict-modal";

export const createDictCommandLinstener: Middleware<
  SlackCommandMiddlewareArgs
> = async ({ body, ack, command, client }) => {
  await ack({ response_type: "ephemeral", text: "wait..." });

  const word = body.team_id
    ? await Word.findOne({ title: command.text, teamId: body.team_id })
    : await Word.findOne({
        title: command.text,
        enterpriseId: body.enterprise_id,
      });

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
