import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import * as dotenv from "dotenv";
import { AnalyticsController } from "./modules/analytics/analytics.controller";
import { AuthController } from "./modules/auth/auth.controller";
import { CategoryController } from "./modules/category/category.controller";
import { OrderController } from "./modules/order/order.controller";
import { PositionController } from "./modules/position/position.controller";
import databaseConnection, {
  DatabaseConnection,
} from "./utils/databaseConnection";
import passportJwtConfig from "./config/passport-jwt.config";

export class Application {
  app: Express;
  port: number;
  authController: AuthController;
  orderController: OrderController;
  categoryController: CategoryController;
  positionController: PositionController;
  analyticsController: AnalyticsController;
  databaseConnection: DatabaseConnection;
  constructor() {
    this.app = express();
    this.port = 8888;
    this.authController = new AuthController();
    this.orderController = new OrderController();
    this.categoryController = new CategoryController();
    this.positionController = new PositionController();
    this.analyticsController = new AnalyticsController();
    this.databaseConnection = databaseConnection;
  }

  applyMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(passport.initialize());
  }

  applyRoutes() {
    this.app.use("/api/auth", this.authController.router);
    this.app.use("/api/order", this.orderController.router);
    this.app.use("/api/category", this.categoryController.router);
    this.app.use("/api/position", this.positionController.router);
    this.app.use("/analytics", this.analyticsController.router);
    this.app.use("/uploads", express.static("uploads"));
  }

  runConfigs() {
    dotenv.config();
    passportJwtConfig.run();
  }

  async run() {
    try {
      this.runConfigs();
      this.applyMiddlewares();
      this.applyRoutes();

      await this.databaseConnection.connect();

      this.app.listen(this.port, () => {
        console.log(`Server started on ${this.port}`);
      });
    } catch (e) {
      console.log(e);
      console.log("Server start issue");
      await this.databaseConnection.disconnect();
    }
  }
}
