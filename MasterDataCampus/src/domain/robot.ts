import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { RobotId } from "./robotId";
import { RobotType } from "./robotType";
import { Guard } from "../core/logic/Guard";
import  IRobotDTO  from "../dto/IRobotDTO";

interface RobotProps {
  type: string;
  designation: string;
  serialNumber: string;
  description: string;
  available: boolean;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotId (): RobotId {
    return new RobotId(this.robotId.toValue());
  }

  get type (): string {
    return this.props.type;
  }

  get designation (): string {
    return this.props.designation
  }

  get serialNumber (): string {
    return this.props.serialNumber;
  }

  get description (): string {
    return this.props.description;
  }

  get available (): boolean {
    return this.props.available;
  }
  
  set available (value: boolean) {
      this.props.available = value;
  }

  set designation (value: string) {
      this.props.designation = value;
  }

  set description (value: string) {
      this.props.description = value;
  }

  set serialNumber (value: string) {
      this.props.serialNumber = value;
  }

  set type (value: string) {
      this.props.type = value;
  }

  

  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

 public static create (robotDTO:IRobotDTO, id?: UniqueEntityID): Result<Robot> {
    const type = robotDTO.type;
    const designation = robotDTO.designation;
    const serialNumber = robotDTO.serialNumber;
    const description = robotDTO.description;
    const available = robotDTO.available;

   if(!!designation === false) { 
      return Result.fail<Robot>('Designation is required');
    } else {
      const robot = new Robot({ 
        type: type,
        designation: designation,
        serialNumber: serialNumber,
        description: description,
        available: available
      }, id);

      return Result.ok<Robot>(robot);
    }
  }
}