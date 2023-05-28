import { CreatePositionDto } from "./dto/create-position.dto";
import PositionModel from "./position.model";
import { UpdatePositionDto } from "./dto/update-position.dto";

export class PositionRepository {
  async findByUserIdAndCategoryId(categoryId: string, userId: string) {
    return PositionModel.find({
      category: categoryId,
      user: userId,
    });
  }
  async createOne(payload: CreatePositionDto) {
    return new PositionModel(payload).save();
  }
  async deleteOne(id: string) {
    return PositionModel.findByIdAndDelete(id);
  }
  async updateOne(id: string, payload: UpdatePositionDto) {
    return PositionModel.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );
  }
}
