import { Service, Inject } from 'typedi';

import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import IFloorRepo from "../services/IRepos/IFloorRepo";

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(floor: Floor): Promise<boolean> {
    
    const idX = floor.id instanceof Floor ? (<Floor>floor.id).buildingId : floor.id;

    const query = { domainId: idX}; 
    const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

    return !!floorDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.floorId}; 

    const floorDocument = await this.floorSchema.findOne( query );

    try {
      if (floorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.name = floor.floorId;
        floorDocument.description = floor.description;
        await floorDocument.save();

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (floorId: string): Promise<Floor> {
    const query = { domainId: floorId};
    const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    return null;
  }

  public async findByBuildingId (floorId: string): Promise<Floor> {
    const query = { floorId: floorId};
    const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    return null;
  }

 
}