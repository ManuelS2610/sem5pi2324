import { Container } from 'typedi';
import { Document, Model } from 'mongoose';

import { Mapper } from "../core/infra/Mapper";

import IRobotDTO from '../dto/IRobotDTO';

import { Robot } from "../domain/robot";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import RobotRepo from "../repos/robotRepo";

import { IRobotPersistence } from '../dataschema/IRobotPersistence';

export class RobotMap extends Mapper<Robot> {
  public static toDTO( robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      type: robot.type,
      designation: robot.designation,
      serialNumber: robot.serialNumber,
      description: robot.description,
      available: robot.available
    } as IRobotDTO;
  }

  public static  toDomain (robot: any | Model<IRobotPersistence & Document>): Robot {
    const  robotOrError = Robot.create(
      robot,
       new UniqueEntityID(robot.domainId)
       );
      
      
      robotOrError.isFailure ? console.log(robotOrError.error) : '';
      return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {
    const a = {
      domainId: robot.id.toString(),
      type: robot.type,
      designation: robot.designation,
      serialNumber: robot.serialNumber,
      description: robot.description,
      available: robot.available
    }
    return a;
  }
      
}
