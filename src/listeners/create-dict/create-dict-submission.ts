import {
  HeaderBlock,
  Middleware,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from "@slack/bolt";
import { lowDb } from "../../db/lowdb";
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

  const word = await lowDb.getOne("words", { title });
  if (!word) {
    await lowDb.save("words", { title, desc });
  }
};
