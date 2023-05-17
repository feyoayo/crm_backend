import * as mongoose from "mongoose";
import { SCHEMA_NAMES } from "../utils/schemaNames";

const UsersSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  last_name: { type: String },
  first_name: { type: String, required: true },
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
