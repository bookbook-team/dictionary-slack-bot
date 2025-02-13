require("dotenv").config(); // always place it into first line
import mongoose from "mongoose";

import { slackAppClient } from "./clients/slack-app-client";
import { MONGO_DB_CONNECTION_URL } from "./db/mongoose";
import {
  CREATE_DICT_BUTTON_CALLBACK_ID,
  CREATE_DICT_CALLBACK_ID,
  UPDATE_DICT_CALLBACK_ID,
} from "./listeners/constants";
import { createDictButtonLinstener } from "./listeners/create-dict/create-dict-button-action";
import { createDictCommandLinstener } from "./listeners/create-dict/create-dict-slash-command";
import { createDictSubmissionListener } from "./listeners/create-dict/create-dict-submission";
import { allMessageLinstener } from "./listeners/message";
import { updateDictCommandLinstener } from "./listeners/update-dict/update-dict-slash-command";
import { updateDictSubmissionListener } from "./listeners/update-dict/update-dict-submission";

slackAppClient.event("app_mention", allMessageLinstener);
slackAppClient.command("/create-dict", createDictCommandLinstener);
slackAppClient.command("/update-dict", updateDictCommandLinstener);
slackAppClient.view(
  { callback_id: UPDATE_DICT_CALLBACK_ID, type: "view_submission" },
  updateDictSubmissionListener
);
slackAppClient.view(
  { callback_id: CREATE_DICT_CALLBACK_ID, type: "view_submission" },
  createDictSubmissionListener
);
slackAppClient.action(
  CREATE_DICT_BUTTON_CALLBACK_ID,
  createDictButtonLinstener
);

(async () => {
  await mongoose.connect(MONGO_DB_CONNECTION_URL);
  await slackAppClient.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})().catch((e) => {
  mongoose.disconnect().then();
  console.log(e);
});
