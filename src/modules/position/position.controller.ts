import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import PositionService from "./position.service";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";

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
  async post(
    req: Request<{}, {}, { cost: string; name: string; categoryId: string }>,
    res: Response
  ) {
    try {
      const { name, cost, categoryId } = req.body;
      const payload: CreatePositionDto = {
        user: req.user._id,
        cost,
        name,
        category: categoryId,
      };
      const position = await this.positionService.createPosition(payload);
      return this.created(res, position);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while position creation");
    }
  }
  async patch(
    req: Request<{ id: string }, {}, UpdatePositionDto>,
    res: Response
  ) {
    try {
      const position = await this.positionService.updatePosition(
        req.params.id,
        req.body
      );
      return this.ok(res, position);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Position update error");
    }
  }
  async delete(req: Request<{ id: string }, {}, {}>, res: Response) {
    try {
      await this.positionService.deletePosition(req.params.id);
      return this.ok(res, "Deleted successfully");
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while position delete");
    }
  }
}
