import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Interface } from "readline";
import BuildingRepo from "../repos/buildingRepo";
import { Building } from "./building";
import { ElevatorId } from "./elevatorId";
import { IElevatorDTO } from "../dto/IElevatorDTO";

interface ElevatorProps {
  name: string;
  buildingName: string;
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
  
  set name ( value: string) {
    this.props.name = value;
  }

  set buildingName ( value: string) {
    this.props.buildingName = value;
  }

  private constructor (props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (elevatorDTO:IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    const name = elevatorDTO.name;
    const buildingName = elevatorDTO.buildingName;

    if (!!name === false || name.length === 0 ) {
      return Result.fail<Elevator>('Must provide a Elevator name')
    } else {
      const elevator = new Elevator({ 
      name : name,
      buildingName: buildingName,
      } , id);
      return Result.ok<Elevator>( elevator )
    }

      
  }
}