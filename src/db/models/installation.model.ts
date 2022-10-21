import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const InstallationSchema = new Schema({
  enterprise: new Schema({ id: String, name: String }),
  team: new Schema({ id: String, name: String }),
  user: new Schema({ id: String }),
  bot: new Schema({
    scopes: [String],
    token: String,
    userId: String,
    id: String,
  }),
  tokenType: String,
  isEnterpriseInstall: Boolean,
  appId: String,
  authVersion: String,
});

export const Installation = mongoose.model("Installation", InstallationSchema);
