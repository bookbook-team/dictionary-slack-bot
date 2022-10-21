import * as models from "./models";

export const MONGO_DB_CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority`;
// export const MONGO_DB_CONNECTION_URL = `mongodb://root:1234@127.0.0.1:27017`;
