import { Response, Request } from 'express';

import { Container, Service,Inject} from 'typedi';

import config from '../../config';

import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import IElevatorServices from '../services/IServices/IElevatorService';
import { ElevatorMap } from "../mappers/ElevatorMap";
import { IElevatorDTO } from '../dto/IElevatorDTO';
import { Result } from "../core/logic/Result";
import IElevatorController from './IControllers/IElevatorController';
import { NextFunction } from 'express-serve-static-core';
import IElevatorService from '../services/IServices/IElevatorService';

@Service()
export default class ElevatorController implements IElevatorController {
constructor(
    @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService
) {}

public async createElevator(req:Request, res:Response , next: NextFunction){
    try{
        const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;
        if(elevatorOrError.isFailure){
            return res.status(402).send();
        }
        const elevatorDTO = elevatorOrError.getValue();
        return res.json(elevatorDTO).status(201);
    }
    catch(e){
        return next(e);
    }
};

public async updateElevator(req:Request, res:Response , next: NextFunction){
    try{
        const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;
        if(elevatorOrError.isFailure){
            return res.status(404).send();
        }
        const elevatorDTO = elevatorOrError.getValue();
        return res.json(elevatorDTO).status(201);
    }
    catch(e){
        return next(e);
    }
}

public async getElevatorsInBuilding(req:Request, res:Response , next: NextFunction){
    try{
        let aux = req.url.substring(1,req.url.length);
        const elevatorsOrError = await this.elevatorServiceInstance.getElevatorsInBuilding(aux) as Result<Array<IElevatorDTO>>;
        if(elevatorsOrError.isFailure){
            return res.status(404).send();
        }
        const elevatorDTO = elevatorsOrError.getValue();
        return res.json(elevatorDTO).status(201);
    }catch(e){
        return next(e);
    }   
}

public async getFloorsServedByElevatorsInBuilding(req: Request, res: Response, next: NextFunction) {
    try {
        let aux = req.url.substring(1,req.url.length);
      const floorsOrError = await this.elevatorServiceInstance.getFloorsServedByElevatorsInBuilding(aux);
  
      if (floorsOrError.isFailure) {
        return res.status(404).send();
      }
  
      const floors = floorsOrError.getValue();
      return res.json(floors).status(200);
    } catch (e) {
      return next(e);
    }
  }
  

}
