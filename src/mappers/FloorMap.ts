
import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IFloorDTO} from '../dto/IFloorDTO';

import { Floor } from "../domain/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import FloorRepo from "../repos/floorRepo";

export class FloorMap extends Mapper<Floor> {
    public static toDTO( floor: Floor): IFloorDTO {
        return {
            floorId: floor.floorId,
            buildingId: floor.buildingId,
            description: floor.description,
          } as IFloorDTO;
        }
      
        public static async toDomain (raw: any): Promise<Floor> {
          const  buildingOrError = Floor.create({floorId: raw.floorId,buildingId: raw.buildingId,description: raw.description},
             new UniqueEntityID(raw.domainId))
            const repo = Container.get(FloorRepo);
            
            
            buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
            return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
        }
      
        public static toPersistence (floor: Floor): any {
          const a = {
            domainId: floor.id.toString(),
            floorId: floor.floorId,
            buildingId: floor.buildingId,
            description: floor.description,
          }
          return a;
        }
            
      }