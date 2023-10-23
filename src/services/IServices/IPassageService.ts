import { Result } from "../../core/logic/Result";
import {IPassageDTO} from "../../dto/IPassageDTO";

export default interface IBPassageService  {
  createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  getPassagesBetween2Buildings(building1: string, building2: string): Promise<Result<Array<IPassageDTO>>>;
}