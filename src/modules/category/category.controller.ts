import { Response, Request } from "express";
import { BaseController } from "../../utils/baseController";

export class CategoryController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      { path: "/", handler: this.getAll, method: "get" },
      { path: "/", handler: this.post, method: "post" },
      { path: "/:id", handler: this.getById, method: "get" },
      { path: "/:id", handler: this.delete, method: "delete" },
      { path: "/:id", handler: this.patch, method: "patch" },
    ]);
  }

  getAll(req: Request, res: Response) {
    return res.status(200).json({
      status: "Ok",
      data: [],
    });
  }
  getById(req: Request, res: Response) {
    const id = req.params.id;
    return res.status(200).json({
      status: "Ok",
      data: {},
      id,
    });
  }
  post(req: Request, res: Response) {
    return res.status(200).json({
      status: "Ok",
      data: {},
    });
  }
  delete(req: Request, res: Response) {
    const id = req.params.id;
    return res.status(200).json({
      status: "Ok",
      data: {},
      id,
    });
  }
  patch(req: Request, res: Response) {
    const id = req.params.id;
    return res.status(200).json({
      status: "Ok",
      data: {},
      id,
    });
  }
}
