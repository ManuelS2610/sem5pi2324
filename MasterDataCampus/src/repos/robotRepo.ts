import { Service, Inject } from 'typedi';

import { Robot } from '../domain/robot';
import { RobotMap } from '../mappers/RobotMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { RobotId } from '../domain/robotId';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(robot: Robot): Promise<boolean> {
    
    const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

    const query = { domainId: idX}; 
    const robotDocument = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document>);

    return !!robotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString()}; 

    const robotDocument = await this.robotSchema.findOne( query );

    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.type = robot.type;
        robotDocument.designation = robot.designation;
        robotDocument.serialNumber = robot.serialNumber;
        robotDocument.description = robot.description;
        robotDocument.available = robot.available;
        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findByDomainId (robotId: RobotId | string): Promise<Robot> {
    const query = { domainId: robotId.toString()}; 
    const robotRecord = await this.robotSchema.findOne(query) as IRobotPersistence;
    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    }
    return null;
  }

  public async findAll (): Promise<Robot[]> {
    const robotRecord = await this.robotSchema.find();
    if (robotRecord != null) {
      return robotRecord.map((item) => RobotMap.toDomain(item));
    }
    return null;
  }

  public async findBySerialNumber (serialNumber: string): Promise<Robot> {
    const query = { serialNumber: serialNumber};
    const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );
    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    }
    return null;
  }


  public async findByDesignation (name: string): Promise<Robot[]>  {
    const query = { designation: name};
    const robotRecord = await this.robotSchema.find( query as FilterQuery<IRobotPersistence & Document> );


    if (robotRecord != null) {
     return robotRecord.map((item) => RobotMap.toDomain(item));
     
    }

    return null;
}

public async findByTask (name: string): Promise<Robot[]>  {
  const query = { type: name};
  const robotRecord = await this.robotSchema.find( query as FilterQuery<IRobotPersistence & Document> );
 

  if (robotRecord != null) {
   return robotRecord.map((item) => RobotMap.toDomain(item));
   
  }
  return null;
}


  
}