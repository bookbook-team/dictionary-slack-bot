import { DICT_DESC_BLOCK_ID, DICT_TITLE_BLOCK_ID } from "./constants";

export interface OpenDictModalArgs {
  triggerId: string;
  wordTitle: string;
  callbackId: string;
  modal?: {
    title?: string;
    submitButtonText?: string;
    defaultValue?: string;
  };
  client: any;
}

export const openDictModal = async (args: OpenDictModalArgs) => {
  const { triggerId, modal, wordTitle, callbackId, client } = args;
  await client.views.open({
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: callbackId,
      title: {
        type: "plain_text",
        text: modal?.title ?? "please describe the word",
      },
      submit: {
        type: "plain_text",
        text: modal?.submitButtonText ?? "create",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "close",
      },
      blocks: [
        {
          type: "header",
          block_id: DICT_TITLE_BLOCK_ID,
          text: {
            type: "plain_text",
            text: wordTitle,
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: DICT_DESC_BLOCK_ID,
          label: {
            type: "plain_text",
            text: `please describe '${wordTitle}' :)`,
            emoji: true,
          },
          element: {
            type: "plain_text_input",
            multiline: true,
            focus_on_load: true,
            max_length: 1000,
            ...(modal?.defaultValue
              ? { initial_value: modal.defaultValue }
              : undefined),
          },
        },
      ],
    },
  });
};
