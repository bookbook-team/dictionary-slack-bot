import {
  HeaderBlock,
  Middleware,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from "@slack/bolt";
import { Word } from "../../db/models";
import { DICT_DESC_BLOCK_ID, DICT_TITLE_BLOCK_ID } from "../constants";

export const updateDictSubmissionListener: Middleware<
  SlackViewMiddlewareArgs<ViewSubmitAction>
> = async ({ body, ack }) => {
  await ack({ response_action: "clear" });
  const desc =
    Object.values(body.view.state.values[DICT_DESC_BLOCK_ID])[0].value ?? "";

  const titleBlock = body.view.blocks.find(
    (block) => block.block_id === DICT_TITLE_BLOCK_ID
  );
  const title = (titleBlock as HeaderBlock).text.text;

  if (body.team?.id) {
    await Word.findOneAndUpdate(
      { title, teamId: body.team.id },
      { title, desc, teamId: body.team?.id, enterpriseId: body.enterprise?.id }
    );
  } else {
    await Word.findOneAndUpdate(
      { enterpriseId: body.enterprise?.id },
      { title, desc, teamId: body.team?.id, enterpriseId: body.enterprise?.id }
    );
  }
};
