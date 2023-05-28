import CategoryModel from "./category.model";
import PositionModel from "../position/position.model";

export class CategoryService {
  async getAllCategories(userId: string) {
    return CategoryModel.find({ user: userId });
  }
  async getCategoryById(categoryId: string) {
    return CategoryModel.findById(categoryId);
  }
  async removeCategory(categoryId: string) {
    await CategoryModel.findByIdAndDelete(categoryId);
    await PositionModel.deleteMany({ category: categoryId });
    return true;
  }
}
