import express, { Express } from "express";
import bodyParser from "body-parser";

import { AnalyticsController } from "./analytics/analytics.controller";
import { AuthController } from "./auth/auth.controller";
import { CategoryController } from "./category/category.controller";
import { OrderController } from "./order/order.controller";
import { PositionController } from "./position/position.controller";

export class Application {
  app: Express;
  port: number;
  authController: AuthController;
  orderController: OrderController;
  categoryController: CategoryController;
  positionController: PositionController;
  analyticsController: AnalyticsController;
  constructor() {
    this.app = express();
    this.port = 8888;
    this.authController = new AuthController();
    this.orderController = new OrderController();
    this.categoryController = new CategoryController();
    this.positionController = new PositionController();
    this.analyticsController = new AnalyticsController();
  }

  applyMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  applyRoutes() {
    this.app.use("/api/auth", this.authController.router);
    this.app.use("/api/order", this.orderController.router);
    this.app.use("/api/category", this.categoryController.router);
    this.app.use("/api/position", this.positionController.router);
    this.app.use("/analytics", this.analyticsController.router);
  }

  run() {
    this.applyMiddlewares();
    this.applyRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server started on ${this.port}`);
    });
  }
}
