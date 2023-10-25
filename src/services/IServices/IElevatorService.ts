import { Result } from "../../core/logic/Result";
import {IElevatorDTO} from "../../dto/IElevatorDTO";

export default interface IElevatorService  {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getElevatorsInBuilding(buildingName: string): Promise<Result<Array<IElevatorDTO>>>;
  getFloorsServedByElevatorsInBuilding(buildingName: string): Promise<Result<string[]>>;
  updatePosition(elevatorDTO: IElevatorDTO, id:string): Promise<Result<IElevatorDTO>>;
}