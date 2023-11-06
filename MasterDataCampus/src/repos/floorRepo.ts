import { Service, Inject } from 'typedi';

import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

import IFloorRepo from "../services/IRepos/IFloorRepo";
import { FloorId } from '../domain/floorId';
import config from '../../config';

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject('passageSchema') private passageSchema : Model<IPassagePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(floor: Floor): Promise<boolean> {
    
    const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue() : floor.id;

    const query = { domainId: idX}; 
    const floorDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

    return !!floorDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString()}; 

    const floorDocument = await this.floorSchema.findOne( query );

    try {
      if (floorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.name = floor.name;
        floorDocument.buildingName = floor.buildingName;
        floorDocument.description = floor.description;
        floorDocument.map=floor.map;
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

  public async findByFloorId (floorId: string): Promise<Floor> {
    const query = { floorId: floorId};
    const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    return null;
  }

  public async findByName (name: string): Promise<Floor> {
    const query = { name: name};
    const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    return null;
  }

  public async findAll(): Promise<Floor[]> {
    const floorRecord = await this.floorSchema.find();

    if (floorRecord != null) {
      return floorRecord.map((item) => FloorMap.toDomain(item));
    }
    return null;
  }

  public async findAllByBuildingName(buildingName: string): Promise<Floor[]> {

    const building = await this.buildingRepo.findByName(buildingName);
    if (building) {
      const floorRecords = await this.floorSchema.find({ buildingId: building.id.toString() });
  
      if (floorRecords) {
        return floorRecords.map((item) => FloorMap.toDomain(item));
      }
    }
  
    return null;
  }

  public async findFloorsByBuildingName(buildingName: string): Promise<Floor[]> {
    const floorRecords = await this.floorSchema.find({ buildingName });
  
    if (floorRecords.length > 0) {
      return floorRecords.map((item) => FloorMap.toDomain(item));
    }
  
    return [];
  }

  public async findFloorsWithPassages(): Promise<Floor[]> {
    const floorRecords = await this.floorSchema.find();
    const passageRecords = await this.passageSchema.find();
    const floorsWithPassages = floorRecords.filter((floor) => {
      const hasPassage = passageRecords.some((passage) => {
       
        return (
          passage.pisobuilding1 === floor.name || passage.pisobuilding2 === floor.name 
        );
      });
  
      return hasPassage;
    });
  
    return floorsWithPassages.map((item) => FloorMap.toDomain(item));
  }
 
}