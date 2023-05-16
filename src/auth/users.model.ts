import * as mongoose from "mongoose";
import { SCHEMA_NAMES } from "src/utils/schemaNames";

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UsersModel = mongoose.model(SCHEMA_NAMES.users, UsersSchema);
export default UsersModel;
