import PositionModel from "./position.model";
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";

class PositionService {
  async getPositionsById(categoryParam: string, userId: string) {
    return PositionModel.find({
      category: categoryParam,
      user: userId,
    });
  }
  async createPosition(positionPayload: CreatePositionDto) {
    const position = await new PositionModel(positionPayload).save();
    return position;
  }
  async deletePosition(id: string) {
    await PositionModel.findByIdAndDelete(id);
    return true;
  }
  async updatePosition(positionId: string, payload: UpdatePositionDto) {
    const position = await PositionModel.findOneAndUpdate(
      { _id: positionId },
      { $set: payload },
      { new: true }
    );
    return position;
  }
}
export default PositionService;
