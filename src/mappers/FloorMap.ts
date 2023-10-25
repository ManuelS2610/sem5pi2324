
import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import IFloorDTO from '../dto/IFloorDTO';

import { Floor } from "../domain/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import FloorRepo from "../repos/floorRepo";
import BuildingRepo from "../repos/buildingRepo";
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { map } from 'lodash';

export class FloorMap extends Mapper<Floor> {
    public static toDTO( floor: Floor): IFloorDTO {
        return {
            id: floor.id.toString(),
            name: floor.name,
            buildingName: floor.buildingName,
            description: floor.description,
            map: floor.map,
          } as IFloorDTO;
        }
      
        public static  toDomain (floor: any | Model<IFloorPersistence & Document>): Floor {
          const  floorOrError = Floor.create(
            floor,
             new UniqueEntityID(floor.domainId)
             );
            
            
            floorOrError.isFailure ? console.log(floorOrError.error) : '';
            return floorOrError.isSuccess ? floorOrError.getValue() : null;
        }
      
        public static toPersistence (floor: Floor): any {
          const a = {
            domainId: floor.id.toString(),
            name: floor.name,
            buildingName: floor.buildingName,
            description: floor.description,
            map: floor.map,
          }
          return a;
        }
            
      }