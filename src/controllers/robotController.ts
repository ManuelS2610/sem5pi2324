import { Response, Request } from 'express';

import { Container, Service,Inject} from 'typedi';

import config from '../../config';

import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from '../services/IServices/IRobotService';
import { RobotMap } from "../mappers/RobotMap";
import  IRobotDTO  from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";
import IRobotController from './IControllers/IRobotController';
import { NextFunction } from 'express-serve-static-core';

@Service()
export default class RobotController implements IRobotController {
constructor(
    @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
) {}

public async createRobot(req:Request, res:Response , next: NextFunction){
    try{
        const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;
        if(robotOrError.isFailure){
            return res.status(402).send();
        }
        const robotDTO = robotOrError.getValue();
        return res.json(robotDTO).status(201);
    }
    catch(e){
        return next(e);
    }
}

public async updateRobot(req:Request, res:Response , next: NextFunction){
    try{
        const robotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;
        if(robotOrError.isFailure){
            return res.status(404).send();
        }
        const robotDTO = robotOrError.getValue();
        return res.json(robotDTO).status(201);
    }
    catch(e){
        return next(e);
    }
}

public async getallRobots(req:Request, res:Response , next: NextFunction){
    try{
        const robotOrError = await this.robotServiceInstance.getallRobots() as Result<Array<IRobotDTO>>;
        if(robotOrError.isFailure){
            return res.status(404).send();
        }
        const robotDTO = robotOrError.getValue();
        return res.json(robotDTO).status(201);
    }
    catch(e){
        return next(e);
    }


}
}