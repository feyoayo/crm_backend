import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { SCHEMA_NAMES } from "src/utils/schemaNames";

const OrdersSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
  },
  list: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      cost: {
        type: Number,
      },
    },
  ],
  user: {
    ref: SCHEMA_NAMES.users,
    type: Schema.Types.ObjectId,
  },
});

const OrdersModel = mongoose.model(SCHEMA_NAMES.order, OrdersSchema);
export default OrdersModel;
