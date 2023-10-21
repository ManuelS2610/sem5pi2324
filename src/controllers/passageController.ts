import { Response, Request } from 'express';

import { Container, Service,Inject} from 'typedi';

import config from '../../config';

import IPassageRepo from '../services/IRepos/IPassageRepo';
import IPassageService from '../services/IServices/IPassageService';
import { PassageMap } from "../mappers/PassageMap";
import { IPassageDTO } from '../dto/IPassageDTO';

import { Result } from "../core/logic/Result";
import IPassageController from './IControllers/IPassageController';
import { NextFunction } from 'express-serve-static-core';

@Service()
export default class PassageController implements IPassageController {
constructor(
    @Inject(config.services.passage.name) private passageServiceInstance : IPassageService
) {}

public async createPassage(req:Request, res:Response , next: NextFunction){
    try{
        const passageOrError = await this.passageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;
 
        if(passageOrError.isFailure){
            return res.status(402).send();
        }
        const passageDTO = passageOrError.getValue();
        return res.json(passageDTO).status(201);

    }
    catch(e){
        return next(e);
    }
};

public async updatePassage(req:Request, res:Response , next: NextFunction){
    try{
        const passageOrError = await this.passageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>;
        if(passageOrError.isFailure){
            return res.status(404).send();
        }
        const passageDTO = passageOrError.getValue();
        return res.json(passageDTO).status(201);
    }
    catch(e){
        return next(e);
    }
    

}
}