import { Service, Inject } from 'typedi';

import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { ElevatorId } from '../domain/elevatorId';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { IElevatorDTO } from '../dto/IElevatorDTO';
import { Result } from '../core/logic/Result';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { isEmpty } from 'lodash';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(
    @Inject('elevatorSchema') private elevatorSchema : Model<IElevatorPersistence & Document>,
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(elevator: Elevator): Promise<boolean> {
    
    const idX = elevator.id instanceof ElevatorId ? (<ElevatorId>elevator.id).toValue() : elevator.id;

    const query = { domainId: idX}; 
    const elevatorDocument = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document>);

    return !!elevatorDocument === true;
  }

  public async save (elevator: Elevator): Promise<Elevator> {
    const query = { domainId: elevator.id.toString()}; 

    const elevatorDocument = await this.elevatorSchema.findOne( query );

    try {
      if (elevatorDocument === null ) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const elevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(elevatorCreated);
      } else {
        elevatorDocument.buildingName = elevator.buildingName;
        elevatorDocument.floor = elevator.floors;
        elevatorDocument.position = elevator.position;
        await elevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainID(elevatorId: string | ElevatorId): Promise<Elevator> {
    const query = { domainId: elevatorId};
    const elevatorRecord = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document> );

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    }
    return null;
  }

  public async findByElevatorId (elevatorId: string): Promise<Elevator> {
    const query = { elevatorId: elevatorId};
    const elevatorRecord = await this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document> );

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    }
    return null;
  }

  public async listByBuildingName(buildingName: string): Promise<Array<Elevator>> {
    const query = { buildingName: buildingName };
    const elevators = await this.elevatorSchema.find(query).exec();

    if (elevators && elevators.length > 0) {
      return elevators.map((elevator) => ElevatorMap.toDomain(elevator));
    } else {
      return [];
    }
  }


  public async checkIfBuildingHasElevator(buildingName: string): Promise<boolean> {
    try {
      const query = { buildingName: buildingName };
      const elevatorsInBuilding = await this.elevatorSchema.find(query as FilterQuery<IElevatorPersistence & Document>);

      if (elevatorsInBuilding.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

}