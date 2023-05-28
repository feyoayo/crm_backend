import { OrderListItem } from "../order.types";

export class CreateOrderDto {
  list: OrderListItem[];
  user: string;
}
