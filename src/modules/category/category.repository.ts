import CategoryModel from "./category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

export class CategoryRepository {
  async getAllByUserId(userId: string) {
    return CategoryModel.find({ user: userId });
  }
  async getById(categoryId: string) {
    return CategoryModel.findById(categoryId);
  }
  async getByName(name: string) {
    return CategoryModel.findOne({ name });
  }
  async deleteOne(categoryId: string) {
    return CategoryModel.findByIdAndDelete(categoryId);
  }
  async create(payload: CreateCategoryDto) {
    return new CategoryModel(payload).save();
  }
  async updateOne(id: string, payload: UpdateCategoryDto) {
    return CategoryModel.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
  }
}
