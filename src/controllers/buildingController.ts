import { Response, Request } from 'express';

import { Container, Service,Inject} from 'typedi';

import config from '../../config';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from '../services/IServices/IBuildingService';
import { BuildingMap } from "../mappers/BuildingMap";
import { IBuildingDTO } from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";
import IBuildingController from './IControllers/IBuildingController';
import { NextFunction } from 'express-serve-static-core';

@Service()
export default class BuildingController implements IBuildingController {
constructor(
    @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
) {}

public async createBuilding(req:Request, res:Response , next: NextFunction){
    try{
        const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
        if(buildingOrError.isFailure){
            return res.status(402).send();
        }
        const buildingDTO = buildingOrError.getValue();
        return res.json(buildingDTO).status(201);
    }
    catch(e){
        return next(e);
    }
};

public async updateBuilding(req:Request, res:Response , next: NextFunction){
    try{
        const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
        if(buildingOrError.isFailure){
            return res.status(404).send();
        }
        const buildingDTO = buildingOrError.getValue();
        return res.json(buildingDTO).status(201);
    }
    catch(e){
        return next(e);
    }
    

}
}

