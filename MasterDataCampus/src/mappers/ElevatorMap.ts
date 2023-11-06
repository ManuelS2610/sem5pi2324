
import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';

import {IElevatorDTO} from '../dto/IElevatorDTO';

import { Elevator } from "../domain/elevator";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import ElevatorRepo from "../repos/elevatorRepo";
import BuildingRepo from "../repos/buildingRepo";
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { floor, flowRight } from 'lodash';

export class ElevatorMap extends Mapper<Elevator> {
    public static toDTO( elevator: Elevator): IElevatorDTO {
        return {
            id: elevator.id.toString(),
            buildingName: elevator.buildingName,
            floors: elevator.floors,
            position: elevator.position
          } as IElevatorDTO;
        }
      
        public static  toDomain (elevator: any | Model<IElevatorPersistence & Document>): Elevator {
          const  elevatorOrError = Elevator.create(
            elevator,
            new UniqueEntityID(elevator.domainId),
             );
            
            
            elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
            return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
        }
      
        public static toPersistence (elevator: Elevator): any {
          const a = {
            domainId: elevator.id.toString(),
            buildingName: elevator.buildingName,
            floors: elevator.floors,
            position: elevator.position
          }
          return a;
        }
            
      }