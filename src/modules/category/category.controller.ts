import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";
import { CategoryService } from "./category.service";

export class CategoryController extends BaseController {
  categoryService: CategoryService;
  constructor() {
    super();
    this.categoryService = new CategoryService();
    this.bindRoutes([
      {
        path: "/",
        handler: this.getAll,
        method: "get",
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/",
        handler: this.post,
        method: "post",
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/:id",
        handler: this.getById,
        method: "get",
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/:id",
        handler: this.delete,
        method: "delete",
        middlewares: [new PassportJwtMiddleware().run()],
      },
      {
        path: "/:id",
        handler: this.patch,
        method: "patch",
        middlewares: [new PassportJwtMiddleware().run()],
      },
    ]);
  }

  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAllCategories(
        req.user._id
      );
      return this.ok(res, categories);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while getting categories");
    }
  }
  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const category = await this.categoryService.getCategoryById(
        req.params.id
      );
      return this.ok(res, category);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Error while getting category");
    }
  }
  post(req: Request, res: Response) {
    try {
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "");
    }
  }
  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return this.errorMessage(res, "Provide valid ID");
      await this.categoryService.removeCategory(id);
      return this.ok(res, "Category deleted");
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "");
    }
  }
  patch(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "");
    }
  }
}
