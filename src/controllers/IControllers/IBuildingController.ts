import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';



export default interface IBuildingController  {
  createBuilding(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
  getBuilding(req: Request, res: Response, next: NextFunction);
}