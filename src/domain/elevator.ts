import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Interface } from "readline";
import BuildingRepo from "../repos/buildingRepo";
import { Building } from "./building";
import { ElevatorId } from "./elevatorId";
import { IElevatorDTO } from "../dto/IElevatorDTO";
import ElevatorRepo from "../repos/elevatorRepo";
import {Floor} from "./floor";
import { floor } from "lodash";
import elevatorSchema from "../persistence/schemas/elevatorSchema";

interface ElevatorProps {
  buildingName: string;
  floors:string[];
  position: number[];
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingName (): string {
    return this.props.buildingName;
  }

  get elevatorId (): ElevatorId {
    return new ElevatorId(this.elevatorId.toValue());
  }

  get floors(): string[] {
    return this.props.floors;
  }

  get position(): number[]{
    return this.props.position;
  }
  
  set floors(value: string[]) {
    this.props.floors = value;
  }

  set buildingName ( value: string) {
    this.props.buildingName = value;
  }

  set position(value : number[]){
    this.props.position= value
  }

  private constructor (props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    const buildingName = elevatorDTO.buildingName;
    const floors = elevatorDTO.floors;
    const position = elevatorDTO.position;
   // const elevatorRepo = new ElevatorRepo(elevatorSchema);
    //if(elevatorRepo.checkIfBuildingHasElevator(buildingName)){
     // return Result.fail<Elevator>('The elevator already exists in this building');
    //}
    if (!!buildingName === false || buildingName.length === 0) {
      return Result.fail<Elevator>('Must provide an Elevator name');
    } else {
      const elevator = new Elevator({
        buildingName: buildingName,
        floors: floors,
        position: position
      }, id);
      return Result.ok<Elevator>(elevator);
    }
  }
}