import { Request, Response, NextFunction } from 'express';


export default interface IRoomController  {
  createRoom(req: Request, res: Response, next: NextFunction);
  updateRoom(req: Request, res: Response, next: NextFunction);
  getRoomsByFloor(req: Request, res: Response, next: NextFunction);
  getAllRooms(req: Request, res: Response, next: NextFunction);
}