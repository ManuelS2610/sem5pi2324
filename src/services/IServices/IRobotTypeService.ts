import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService  {
  createType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  updateType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;

  getRobotType (robotTypeId: string): Promise<Result<IRobotTypeDTO>>;
}