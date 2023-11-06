import {Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO"; 

export default interface IRobotService  {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  getRobot (robotId: string): Promise<Result<IRobotDTO>>;
  getallRobots(): Promise<Result<Array<IRobotDTO>>>;
  findByTask(type: string): Promise<Result<Array<IRobotDTO>>>;
  findByDesignation(designation: string): Promise<Result<Array<IRobotDTO>>>;
  inhibitRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>

}