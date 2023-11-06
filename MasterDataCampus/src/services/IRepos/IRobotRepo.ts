import { Robot } from "../../domain/robot";
import { Repo } from "../../core/infra/Repo";
import { RobotId } from "../../domain/robotId";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByDomainId (robotId: RobotId | string): Promise<Robot>;
  
  findAll(): Promise<Robot[]>;
  findBySerialNumber (serialNumber: string): Promise<Robot>;

  //findByName (robotName: string): Promise<Robot>;
  findByTask(type: string): Promise<Robot[]>;
  findByDesignation(designation: string): Promise<Robot[]>;
}