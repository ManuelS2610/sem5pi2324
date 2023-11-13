import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";


interface RobotTypeProps {
  name: string;
  robotDesignation: string;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  
  get id (): UniqueEntityID {
    return this._id;
  }

  get name (): string {
    return this.props.name;
  }

  get robotDesignation (): string {
    return this.props.robotDesignation;
  }

  set robotDesignation ( value: string) {
    this.props.robotDesignation = value;
  }

  set name ( value: string) {
    this.props.name = value;
  }
  private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotTypeDTO: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
    const name = robotTypeDTO.name;
    const robotDesignation = robotTypeDTO.robotDesignation;

    if (!!name === false || name.length === 0) {
      return Result.fail<RobotType>('Must provide a robotType name')
    } else {
      const robotType = new RobotType({ name: name,robotDesignation: robotDesignation }, id);
      return Result.ok<RobotType>( robotType )
    }
  }
}