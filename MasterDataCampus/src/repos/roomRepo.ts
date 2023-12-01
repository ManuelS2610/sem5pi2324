import { Service, Inject } from 'typedi';

import { Room } from '../domain/room';
import { RoomMap } from '../mappers/RoomMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import { RoomId } from '../domain/roomId';

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject('roomSchema') private roomSchema : Model<IRoomPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(room: Room): Promise<boolean> {
    
    const idX = room.id instanceof RoomId ? (<RoomId>room.id).toValue() : room.id;

    const query = { domainId: idX}; 
    const roomDocument = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document>);

    return !!roomDocument === true;
  }

  public async save (room: Room): Promise<Room> {
    const query = { domainId: room.id.toString()}; 

    const roomDocument = await this.roomSchema.findOne( query );

    try {
      if (roomDocument === null ) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(roomCreated);
      } else {
        roomDocument.category = room.category;
        roomDocument.description = room.description;
        roomDocument.floor = room.floor;
        roomDocument.position = room.position;
        roomDocument.distX = room.distX;
        roomDocument.distY = room.distY;
        await roomDocument.save();

        return room;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId.toString()};
    const roomRecord = await this.roomSchema.findOne(query) as IRoomPersistence;
    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    }
    return null;
  }

  public async findAll(): Promise<Room[]> {
    const rooms = await this.roomSchema.find();
    return rooms.map((room) => RoomMap.toDomain(room)) as Room[];
  }

  public async findByFloor(floor: string): Promise<Room[]> {
    const query = { floor: floor};
    const roomsRecord = await this.roomSchema.find( query as FilterQuery<IRoomPersistence & Document>);
  if (roomsRecord != null) {
    return roomsRecord.map((item) => 
    RoomMap.toDomain(item));
  }
  return null;
}}
