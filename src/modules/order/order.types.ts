import { Request } from "express";

export type OrderListItem = {
  name: string;
  quantity: number;
  cost: number;
};

export interface GetOrdersQueryParams {
  offset?: string;
  limit?: string;
  start?: string;
  end?: string;
  order?: string;
}
export type GetOrdersRequest = Request<{}, {}, {}, GetOrdersQueryParams>;

export type CreateOrderRequest = Request<{}, {}, { list: OrderListItem[] }>;
