import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const WordSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  teamId: String,
  enterpriseId: String,
});

// word collection
export const Word = mongoose.model("Word", WordSchema);
