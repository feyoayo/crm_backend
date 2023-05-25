import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import PositionService from "./position.service";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";

export class PositionController extends BaseController {
  private positionService: PositionService;
  constructor() {
    super();
    this.positionService = new PositionService();
    this.bindRoutes([
      { path: "/", method: "post", handler: this.post },
      {
        path: "/:categoryId",
        method: "get",
        handler: this.getById,
        middlewares: [new PassportJwtMiddleware().run()],
      },
      { path: "/:id", method: "delete", handler: this.delete },
      { path: "/:id", method: "patch", handler: this.patch },
    ]);
  }
  async getById(req: Request<{ categoryId: string }, {}, {}>, res: Response) {
    try {
      const categoryParam = req.params.categoryId;
      const positions = await this.positionService.getPositionsById(
        categoryParam,
        req.user._id
      );
      return this.ok<typeof positions>(res, positions);
    } catch (e) {
      console.log(e);
      this.errorMessage(res, "Error while getting positions");
    }
  }
  post(req: Request, res: Response) {
    return res.send("post position");
  }
  patch(req: Request, res: Response) {
    return res.send("patch position");
  }
  delete(req: Request, res: Response) {
    return res.send("delete position");
  }
}
