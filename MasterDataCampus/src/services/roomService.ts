import { Container, Service, Inject } from 'typedi';
import config from '../../config';

import IRoomService from './IServices/IRoomService';
import { RoomMap } from "../mappers/RoomMap";
import  IRoomDTO  from '../dto/IRoomDTO';

import IRoomRepo from './IRepos/IRoomRepo';
import { Room } from '../domain/room';
import { Floor } from '../domain/floor';

import IFloorRepo from './IRepos/IFloorRepo';
import { Result } from "../core/logic/Result";
import IBuildingRepo from './IRepos/IBuildingRepo';

@Service()
export default class RoomService implements IRoomService{
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
      @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {}

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
   try{
    let floor : Floor;

    const floorOrError = await this.getFloorName(roomDTO.floor);
    if (floorOrError.isFailure) {
      return Result.fail<IRoomDTO>(floorOrError.errorValue());
    } else {
      floor = floorOrError.getValue();
    }

    const roomOrError = await Room.create(roomDTO);

    if(roomOrError.isFailure){
      return Result.fail<IRoomDTO>(roomOrError.errorValue());
    }

    const roomResult = roomOrError.getValue();

    await this.roomRepo.save(roomResult);

    const roomDTOresult = RoomMap.toDTO(roomResult) as IRoomDTO;
    return Result.ok<IRoomDTO>(roomDTOresult);
  
   }catch(e){
    throw e;
   } 
  }

  public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try{
      let floor : Floor;
      const room = await this.roomRepo.findByDomainId(roomDTO.id);

      if (room === null){
        return Result.fail<IRoomDTO>("Room not found");
    } else {
      const floorOrError = await this.getFloorName(roomDTO.floor);
      if (floorOrError.isFailure) {
        return Result.fail<IRoomDTO>(floorOrError.errorValue());
      } else {
      room.category = roomDTO.category;
      room.description = roomDTO.description;
      room.floor = roomDTO.floor;
      

      await this.roomRepo.save(room);
      }
      const roomDTOresult = RoomMap.toDTO(room) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOresult);
    }
  } catch(e){
    throw e;
  }
}

  public async getRoom (roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findByDomainId(roomId);
      if (!room) {
        return Result.fail<IRoomDTO>('Room not found');
      }

      const roomDTO = RoomMap.toDTO(room) as IRoomDTO;

      return Result.ok<IRoomDTO>(roomDTO);
    } catch (e) {
      return Result.fail<IRoomDTO>(e);
    }
  }
  public async getFloorName(floor: string): Promise<Result<Floor>> {

    const floors = await this.floorRepo.findByName(floor);
    const found = !! floors;

    if (!found) {
      return Result.fail<Floor>('Floor not found');
    } else {
      return Result.ok<Floor>(floors);
    }
  }

  public async getallRooms(): Promise<Result<Array<IRoomDTO>>> {
    try {
      const rooms = await this.roomRepo.findAll();
     
      if (rooms == null) {
        return Result.fail<Array<IRoomDTO>>('Rooms not found');
      }else {
        const roomDTO = rooms.map((room) => RoomMap.toDTO(room)) as Array<IRoomDTO>;
        return Result.ok<Array<IRoomDTO>>(roomDTO);
      }
    } catch (e) {
      throw e;
    }
  }

  public async updatePosition(roomDTO: IRoomDTO, id: string): Promise<Result<IRoomDTO>> {
    try{
      const room = await this.roomRepo.findByDomainId(roomDTO.id);
      if (room === null) {
        return Result.fail<IRoomDTO>("Room not found");
      }
      const floor = await this.floorRepo.findByName(room.floor);
      if (floor.id.toString() != id) {
        return Result.fail<IRoomDTO>("Floor not found");
      }
      const building = await this.buildingRepo.findByName(floor.buildingName);
      if (building.depth<roomDTO.position[0] || building.width<roomDTO.position[1] || roomDTO.position[0]+roomDTO.distX>building.depth+1 || roomDTO.position[1]+roomDTO.distY>building.width+1) {
        return Result.fail<IRoomDTO>("Out of bounds");
      }
      else{
      room.position = roomDTO.position;
      room.distX = roomDTO.distX;
      room.distY = roomDTO.distY;
      await this.roomRepo.save(room);
      const roomDTOResult = RoomMap.toDTO(room) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
      
      }
    }catch(e){
      return Result.fail<IRoomDTO>(e);
    }
  }


}