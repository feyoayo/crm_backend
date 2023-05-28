import PositionModel from "../position/position.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  categoryRepository: CategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getAllCategories(userId: string) {
    return this.categoryRepository.getAllByUserId(userId);
  }
  async getCategoryById(categoryId: string) {
    return this.categoryRepository.getById(categoryId);
  }
  async removeCategory(categoryId: string) {
    await this.categoryRepository.deleteOne(categoryId);
    await PositionModel.deleteMany({ category: categoryId });
    return true;
  }
  async createCategory(payload: CreateCategoryDto) {
    const isExist = await this.categoryRepository.getByName(payload.name);
    if (isExist) return "Category with this name already exist";
    return this.categoryRepository.create(payload);
  }
  async updateCategory(categoryId: string, payload: UpdateCategoryDto) {
    return this.categoryRepository.updateOne(categoryId, payload);
  }
}
