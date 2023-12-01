import {Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getRoomsByFloor(floor: string): Promise<Result<Array<IRoomDTO>>>;

  getRoom (roomId: string): Promise<Result<IRoomDTO>>;
  getallRooms(): Promise<Result<Array<IRoomDTO>>>;
  updatePosition(roomDTO: IRoomDTO, id: string): Promise<Result<IRoomDTO>>

}