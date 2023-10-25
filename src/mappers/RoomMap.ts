import { Container } from 'typedi';
import { Document, Model } from 'mongoose';


import { Mapper } from "../core/infra/Mapper";

import IRoomDTO from '../dto/IRoomDTO';

import { Room } from "../domain/room";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import RoomRepo from "../repos/roomRepo";
import { IRoomPersistence } from '../dataschema/IRoomPersistence';


export class RoomMap extends Mapper<Room> {
  public static toDTO( room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      category: room.category,
      description: room.description,
      floor: room.floor,
    } as IRoomDTO;
  }

  public static  toDomain (room: any | Model<IRoomPersistence & Document>): Room {
    const  roomOrError = Room.create(
      room,
       new UniqueEntityID(room.domainId)
       );
      
      
      roomOrError.isFailure ? console.log(roomOrError.error) : '';
      return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence (room: Room): any {
    const a = {
      domainId: room.id.toString(),
      category: room.category,
      description: room.description,
      floor: room.floor
    }
    return a;
  }
      
}