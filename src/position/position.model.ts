import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { SCHEMA_NAMES } from "src/utils/schemaNames";

const PositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    ref: SCHEMA_NAMES.category,
    type: Schema.Types.ObjectId,
  },
  user: {
    ref: SCHEMA_NAMES.users,
    type: Schema.Types.ObjectId,
  },
});

const PositionModel = mongoose.model(SCHEMA_NAMES.position, PositionSchema);
export default PositionModel;
