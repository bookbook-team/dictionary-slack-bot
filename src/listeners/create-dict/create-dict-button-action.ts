import {
  BlockAction,
  ButtonAction,
  Middleware,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { Word } from "../../db/models";
import { CREATE_DICT_CALLBACK_ID } from "../constants";
import { openDictModal } from "../open-dict-modal";

export const createDictButtonLinstener: Middleware<
  SlackActionMiddlewareArgs<BlockAction>
> = async ({ body, ack, client }) => {
  await ack();

  const wordTitle = (body.actions[0] as ButtonAction).value;
  const word = body.team?.id
    ? await Word.findOne({ title: wordTitle, teamId: body.team.id })
    : await Word.findOne({
        title: wordTitle,
        enterpriseId: body.enterprise?.id,
      });

  if (word) {
    await client.chat.postEphemeral({
      text: `the word '${wordTitle}' is already created`,
      user: body.user.id,
      channel: body.channel?.id ?? "",
    });
    return;
  }

  await openDictModal({
    triggerId: body.trigger_id,
    wordTitle: (body.actions[0] as ButtonAction).value,
    callbackId: CREATE_DICT_CALLBACK_ID,
    client,
  });
};
