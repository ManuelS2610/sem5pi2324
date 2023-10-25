import {Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;

  getRoom (roomId: string): Promise<Result<IRoomDTO>>;
  getallRooms(): Promise<Result<Array<IRoomDTO>>>;

}