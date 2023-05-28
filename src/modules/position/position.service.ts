import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { PositionRepository } from "./position.repository";

class PositionService {
  positionRepository: PositionRepository;

  constructor() {
    this.positionRepository = new PositionRepository();
  }

  async getPositionsById(categoryParam: string, userId: string) {
    return this.positionRepository.findByUserIdAndCategoryId(
      categoryParam,
      userId
    );
  }
  async createPosition(positionPayload: CreatePositionDto) {
    return this.positionRepository.createOne(positionPayload);
  }
  async deletePosition(id: string) {
    await this.positionRepository.deleteOne(id);
    return true;
  }
  async updatePosition(positionId: string, payload: UpdatePositionDto) {
    return this.positionRepository.updateOne(positionId, payload);
  }
}
export default PositionService;
