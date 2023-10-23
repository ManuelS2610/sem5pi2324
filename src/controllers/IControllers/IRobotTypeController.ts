import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController  {
  createType(req: Request, res: Response, next: NextFunction);
  updateType(req: Request, res: Response, next: NextFunction);
}