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
public async getPassagesBetween2Buildings(req:Request, res:Response , next: NextFunction){
    try{
        let aux = req.url.substring(1,2);
        let aux2 = req.url.substring(3,4);
        const passagesOrError = await this.passageServiceInstance.getPassagesBetween2Buildings(aux,aux2) as Result<Array<IPassageDTO>>;
        if(passagesOrError.isFailure){
            return res.status(404).send();
        }
        const passagesDTO = passagesOrError.getValue();
        return res.json(passagesDTO).status(201);
    }catch(e){
        return next(e);
    }   
}
public async getAllPassages(req:Request, res:Response , next: NextFunction){
    try{
        const passagesOrError = await this.passageServiceInstance.getAllPassages() as Result<Array<IPassageDTO>>;
        if(passagesOrError.isFailure){
            return res.status(404).send();
        }
        const passagesDTO = passagesOrError.getValue();
        return res.json(passagesDTO).status(201);
    }catch(e){
        return next(e);
    }   
}

}