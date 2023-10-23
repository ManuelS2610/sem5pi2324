import { Service, Inject } from 'typedi';

import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { ElevatorId } from '../domain/elevatorId';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(
    @Inject('elevatorSchema') private elevatorSchema : Model<IElevatorPersistence & Document>,
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
        elevatorDocument.name = elevator.name;
        elevatorDocument.buildingName = elevator.buildingName;
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

 
}