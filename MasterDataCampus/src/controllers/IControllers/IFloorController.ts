import { Request, Response, NextFunction } from 'express';



export default interface IFloorController  {
  createFloor(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  getallFloors(req: Request, res: Response, next: NextFunction);
  findFloorsByBuildingName(req: Request, res: Response, next: NextFunction);
  findFloorsWithPassages(req: Request, res: Response, next: NextFunction);
  loadMap(req:Request, res:Response , next: NextFunction);
}