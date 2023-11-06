import { Response, Request } from 'express';

import { Container, Service,Inject} from 'typedi';

import config from '../../config';

import IRoomRepo from '../services/IRepos/IRoomRepo';
import IRoomService from '../services/IServices/IRoomService';
import { RoomMap } from "../mappers/RoomMap"; 
import  IRoomDTO  from '../dto/IRoomDTO';

import { Result } from "../core/logic/Result";
import IRoomController from './IControllers/IRoomController';
import { NextFunction } from 'express-serve-static-core';

@Service()
export default class RoomController implements IRoomController {
constructor(
    @Inject(config.services.room.name) private roomServiceInstance : IRoomService
) {}

public async createRoom(req:Request, res:Response , next: NextFunction){
    try{
        const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;
        if(roomOrError.isFailure){
            return res.status(402).send();
        }
        const roomDTO = roomOrError.getValue();
        return res.json(roomDTO).status(201);
    }
    catch(e){
        return next(e);
    }
};

public async updateRoom(req:Request, res:Response , next: NextFunction){
    try{
        const roomOrError = await this.roomServiceInstance.updateRoom(req.body as IRoomDTO) as Result<IRoomDTO>;
        if(roomOrError.isFailure){
            return res.status(404).send();
        }
        const roomDTO = roomOrError.getValue();
        return res.json(roomDTO).status(201);
    }
    catch(e){
        return next(e);
    }
};
}