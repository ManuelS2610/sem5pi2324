import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);
  updateRobot(req: Request, res: Response, next: NextFunction);
  getallRobots(req: Request, res: Response, next: NextFunction);
  findByTask(req: Request, res: Response, next: NextFunction);
  findByDesignation(req: Request, res: Response, next: NextFunction);
  inhibitRobot(req:Request, res:Response , next: NextFunction);
}