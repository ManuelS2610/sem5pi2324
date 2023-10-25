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
  name: string;
  buildingName: string;
  floors: Floor[];
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

  get floors(): Floor[] {
    return this.props.floors;
  }
  
  set floors(value: Floor[]) {
    this.props.floors = value;
  }
  
  set name ( value: string) {
    this.props.name = value;
  }

  set buildingName ( value: string) {
    this.props.buildingName = value;
  }

  private constructor (props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(elevatorDTO: IElevatorDTO, floors: Floor[], id?: UniqueEntityID): Result<Elevator> {
    const name = elevatorDTO.name;
    const buildingName = elevatorDTO.buildingName;
    const elevatorRepo = new ElevatorRepo(elevatorSchema);
    if(elevatorRepo.checkIfBuildingHasElevator(buildingName)){
      return Result.fail<Elevator>('The elevator already exists in this building');
    }
    if (!!name === false || name.length === 0) {
      return Result.fail<Elevator>('Must provide an Elevator name');
    } else {
      const elevator = new Elevator({
        name: name,
        buildingName: buildingName,
        floors: floors,
      }, id);
      return Result.ok<Elevator>(elevator);
    }
  }
}