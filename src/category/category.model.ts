import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { SCHEMA_NAMES } from "src/utils/schemaNames";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  user: {
    ref: SCHEMA_NAMES.users,
    type: Schema.Types.ObjectId,
  },
});

const CategoryModel = mongoose.model(SCHEMA_NAMES.category, CategorySchema);
export default CategoryModel;
