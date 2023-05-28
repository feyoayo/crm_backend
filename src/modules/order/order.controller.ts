import { Response } from "express";
import { BaseController } from "../../utils/baseController";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";
import { OrderService } from "./order.service";
import { CreateOrderRequest, GetOrdersRequest } from "./order.types";

export class OrderController extends BaseController {
  orderService: OrderService;
  constructor() {
    super();
    this.orderService = new OrderService();
    this.bindRoutes([
      {
        path: "/",
        method: "get",
        handler: this.get,
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/",
        method: "post",
        handler: this.post,
        middlewares: [new PassportJwtMiddleware().run()],
      },
    ]);
  }
  async get(req: GetOrdersRequest, res: Response) {
    try {
      const { offset, limit } = req.query;
      const query: Record<string, unknown> = {
        user: req.user._id,
      };
      if (req.query.start) {
        query.date = {
          $gte: req.query.start,
        };
      }
      if (req.query.end) {
        if (!query.date) {
          query.date = {};
        }
        query.date = { $lte: req.query.end };
      }

      if (req.query.order) {
        query.order = +req.query.order;
      }

      const orders = await this.orderService.getOrders(query, offset, limit);
      return this.ok(res, orders);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while getting orders");
    }
  }
  async post(req: CreateOrderRequest, res: Response) {
    try {
      const { list } = req.body;
      const payload = {
        list,
        user: req.user._id,
      };
      const order = await this.orderService.createOrder(payload);
      return this.created(res, order);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while creating order");
    }
  }
}
