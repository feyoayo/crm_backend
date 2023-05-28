import { OrderRepository } from "./order.repository";
import { CreateOrderDto } from "./dto/create-order.dto";

export class OrderService {
  orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async getOrders(
    query: Record<string, unknown>,
    offset: string,
    limit: string
  ) {
    return this.orderRepository.getAll(query, +offset, +limit);
  }
  async createOrder(payload: CreateOrderDto) {
    const lastOrder = await this.orderRepository.getLastOrder(payload.user);
    const maxOrder = lastOrder ? lastOrder.order : 0;

    return this.orderRepository.createOne({ ...payload, order: maxOrder + 1 });
  }
}
