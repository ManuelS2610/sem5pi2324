import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Interface } from "readline";

interface FloorProps {
  floorId: string;
  buildingId: string;
  description: string;
  
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): string {
    return this.props.floorId;
  }

  get buildingId (): string {
    return this.props. buildingId;
  }

  get description (): string {
    return this.props.description;
  }

  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.floorId, argumentName: 'floorId' },
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.description, argumentName: 'description' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message)
    } else {
      const building = new Floor({
        ...props
      }, id);

      return Result.ok<Floor>(building);
    }
  }
}