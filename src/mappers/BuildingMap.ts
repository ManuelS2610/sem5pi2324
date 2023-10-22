import { Container } from 'typedi';
import { Document, Model } from 'mongoose';


import { Mapper } from "../core/infra/Mapper";

import IBuildingDTO from '../dto/IBuildingDTO';

import { Building } from "../domain/building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import BuildingRepo from "../repos/buildingRepo";
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';


export class BuildingMap extends Mapper<Building> {
  public static toDTO( building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      description: building.description,
      depth: building.depth,
      width: building.width,
    } as IBuildingDTO;
  }

  public static  toDomain (building: any | Model<IBuildingPersistence & Document>): Building {
    const  buildingOrError = Building.create(
      building,
       new UniqueEntityID(building.domainId)
       );
      
      
      buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
      return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence (building: Building): any {
    const a = {
      domainId: building.id.toString(),
      name: building.name,
      description: building.description,
      depth: building.depth,
      width: building.width
    }
    return a;
  }
      
}




