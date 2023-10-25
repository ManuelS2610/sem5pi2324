import { Response, Request } from 'express';

import { Container, Service, Inject } from 'typedi';

import config from '../../config';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorService from '../services/IServices/IFloorService';
import { FloorMap } from "../mappers/FloorMap";
import IFloorDTO from '../dto/IFloorDTO';
import IFloorController from './IControllers/IFloorController';
import { Result } from "../core/logic/Result";
import { NextFunction } from 'express-serve-static-core';
import IPassageService from '../services/IServices/IPassageService';
import {IPassageDTO} from '../dto/IPassageDTO';
import IElevatorService from '../services/IServices/IElevatorService';
import { IElevatorDTO } from '../dto/IElevatorDTO';

@Service()
export default class FloorController implements IFloorController {
    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService,
        @Inject(config.services.passage.name) private passageServiceInstance: IPassageService
    ) { }

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;
            if (floorOrError.isFailure) {
                return res.status(402).send();
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;
            if (floorOrError.isFailure) {
                return res.status(404).send();
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    public async getallFloors(req: Request, res: Response, next: NextFunction) {
        try {
            const floorsOrError = await this.floorServiceInstance.getallFloors() as Result<Array<IFloorDTO>>;
            if (floorsOrError.isFailure) {
                return res.status(404).send();
            }
            const floorsDTO = floorsOrError.getValue();
            return res.json(floorsDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

    public async loadMap(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, map, passages, elevators, rooms } = req.body;
            const idAndMap = { id, map };
            for(const passage of passages){
                const passageOrError = await this.passageServiceInstance.updatePassagePosition(passage) as Result<IPassageDTO>;
                if (passageOrError.isFailure) {
                    return res.status(402).send();
                }
            }
            const floorOrError = await this.floorServiceInstance.loadMap(idAndMap as IFloorDTO) as Result<IFloorDTO>;
            if (floorOrError.isFailure) {
                return res.status(404).send();
            }
            const floorDTO = floorOrError.getValue();
            return res.json(floorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
}

