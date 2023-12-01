import { Service, Inject } from 'typedi';

import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType";
import { RobotTypeId } from "../domain/robotTypeId";
import { RobotTypeMap } from "../mappers/RobotTypeMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo{
  private models:any

  constructor(
    @Inject('robotTypeSchema') private robotTypeSchema : Model<IRobotTypePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(robotType: RobotType): Promise<boolean> {
    
    const idX = robotType.id instanceof RobotType ? (<RobotTypeId>robotType.id).toValue() : robotType.id;

    const query = { domainId: idX}; 
    const robotTypeDocument = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document>);

    return !!robotTypeDocument === true;
  }

  public async save (robotType: RobotType): Promise<RobotType> {
    const query = { domainId: robotType.id.toString()}; 

    const robotTypeDocument = await this.robotTypeSchema.findOne( query );

    try {
      if (robotTypeDocument === null ) {
        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);

        const RobotTypeCreated = await this.robotTypeSchema.create(rawRobotType);

        return RobotTypeMap.toDomain(RobotTypeCreated);
      } else {
        robotTypeDocument.name = robotType.name;
        robotTypeDocument.robotDesignation = robotType.robotDesignation;
        await robotTypeDocument.save();

        return robotType;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (robotTypeId: RobotTypeId | string): Promise<RobotType> {
    const query = { domainId: robotTypeId};
    const robotTypeRecord = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document> );

    if( robotTypeRecord != null) {
      return RobotTypeMap.toDomain(robotTypeRecord);
    }
    else
      return null;
  }

  public async findByType(robotType: string): Promise<RobotType> {
     const query = { name: robotType};
      const robotTypeRecord = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document> );
      if( robotTypeRecord != null) {
        return RobotTypeMap.toDomain(robotTypeRecord);
      }
      else
        return null;

      
  }

  public async findAll (): Promise<RobotType[]> {
    const robotTypeRecord = await this.robotTypeSchema.find();
    if (robotTypeRecord != null) {
      return robotTypeRecord.map((robotType) => RobotTypeMap.toDomain(robotType));
    }
    else
      return null;
  }
}
