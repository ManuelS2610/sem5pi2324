import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IBuildingDTO} from '../dto/IBuildingDTO';

import { Building } from "../domain/building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import BuildingRepo from "../repos/buildingRepo";


export class BuildingMap extends Mapper<Building> {
  public static toDTO( building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      description: building.description,
    } as IBuildingDTO;
  }

  public static async toDomain (raw: any): Promise<Building> {
    const  buildingOrError = Building.create({buildingId: raw.buildingId, name: raw.name, description: raw.description},
       new UniqueEntityID(raw.domainId))
      const repo = Container.get(BuildingRepo);
      
      
      buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
      return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence (building: Building): any {
    const a = {
      domainId: building.id.toString(),
      buildingId: building.buildingId,
      name: building.name,
      description: building.description,
    }
    return a;
  }
      
}




