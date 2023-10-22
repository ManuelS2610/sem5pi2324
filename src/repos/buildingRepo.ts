import { Service, Inject } from 'typedi';

import { Building } from '../domain/building';
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { BuildingId } from '../domain/buildingId';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(building: Building): Promise<boolean> {
    
    const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

    const query = { domainId: idX}; 
    const buildingDocument = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document>);

    return !!buildingDocument === true;
  }

  public async save (building: Building): Promise<Building> {
    const query = { domainId: building.id.toString()}; 

    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.name = building.name;
        buildingDocument.description = building.description;
        buildingDocument.depth = building.depth;
        buildingDocument.width = building.width;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (buildingId: string): Promise<Building> {
    const query = { domainId: buildingId};
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    return null;
  }

  public async findByBuildingId (buildingId: string): Promise<Building> {
    const query = { buildingId: buildingId};
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    return null;
  }

  public async findByName (name: string): Promise<Building> {
    const query = { name: name};
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    return null;
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecord = await this.buildingSchema.find();

    if (buildingRecord != null) {
      return buildingRecord.map((item) => BuildingMap.toDomain(item));
    }
    return null;
  }
 
}