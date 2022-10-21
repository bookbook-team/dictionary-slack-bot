import {
  HeaderBlock,
  Middleware,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from "@slack/bolt";
import { Word } from "../../db/models";
import { DICT_DESC_BLOCK_ID, DICT_TITLE_BLOCK_ID } from "../constants";

export const createDictSubmissionListener: Middleware<
  SlackViewMiddlewareArgs<ViewSubmitAction>
> = async ({ body, ack }) => {
  await ack({ response_action: "clear" });

  const desc =
    Object.values(body.view.state.values[DICT_DESC_BLOCK_ID])[0].value ?? "";

  const titleBlock = body.view.blocks.find(
    (block) => block.block_id === DICT_TITLE_BLOCK_ID
  );
  const title = (titleBlock as HeaderBlock).text.text;

  const word = body.team?.id
    ? await Word.findOne({ title, teamId: body.team.id })
    : await Word.findOne({ title, enterpriseId: body.enterprise?.id });

  if (!word) {
    await Word.create({
      title,
      desc,
      teamId: body.team?.id,
      enterpriseId: body.enterprise?.id,
    });
  }
};
