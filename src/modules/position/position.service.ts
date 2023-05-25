import PositionModel from "./position.model";

class PositionService {
  async getPositionsById(categoryParam: string, userId: string) {
    return PositionModel.find({
      category: categoryParam,
      user: userId,
    });
  }
}
export default PositionService;
