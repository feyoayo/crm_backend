import OrderModel from "./order.model";
import { CreateOrderDto } from "./dto/create-order.dto";

export class OrderRepository {
  async getAll(query: Record<string, unknown>, offset: number, limit: number) {
    return OrderModel.find(query).sort({ date: -1 }).skip(offset).limit(limit);
  }

  async getLastOrder(userId: string) {
    return OrderModel.findOne({ user: userId }).sort({ date: -1 });
  }
  async createOne(payload: CreateOrderDto & { order: number }) {
    return new OrderModel(payload).save();
  }
}
