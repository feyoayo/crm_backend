import { Request, Response } from "express";
import { BaseController } from "../../utils/baseController";
import { PassportJwtMiddleware } from "../../middlewares/passport-jwt.middleware";
import { CategoryService } from "./category.service";
import { uploadImageMiddleware } from "../../middlewares/upload-category-image.middleware";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

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
        middlewares: [new PassportJwtMiddleware().run(), uploadImageMiddleware],
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
        middlewares: [new PassportJwtMiddleware().run(), uploadImageMiddleware],
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
  async post(req: Request<{}, {}, { name: string }>, res: Response) {
    try {
      const { name } = req.body;
      const payload: CreateCategoryDto = {
        name,
        image: req.file ? req.file.path : "",
        user: req.user._id,
      };
      const category = await this.categoryService.createCategory(payload);
      if (category === "Category with this name already exist") {
        return this.errorMessage(res, category);
      }
      if (category) {
        return this.created(res, category);
      }
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
  async patch(
    req: Request<{ id: string }, {}, UpdateCategoryDto>,
    res: Response
  ) {
    try {
      const id = req.params.id;
      const payload = req.body;
      if (req.file) {
        payload.image = req.file.path;
      }
      const updatedCategory = await this.categoryService.updateCategory(
        id,
        payload
      );
      this.ok(res, updatedCategory);
    } catch (e) {
      console.log(e);
      return this.errorMessage(res, "Category update error");
    }
  }
}
