import { Result } from "../../core/logic/Result";
import {IPassageDTO} from "../../dto/IPassageDTO";

export default interface IBPassageService  {
  createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;

}