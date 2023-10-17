import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IFloorService from './IServices/IFloorService';
import { FloorMap } from "../mappers/FloorMap";
import {IFloorDTO} from '../dto/IFloorDTO';

import IFloorRepo from './IRepos/IFloorRepo';

import { Floor } from '../domain/floor';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorService implements IFloorService{
  constructor(
      @Inject(config.repos.building.name) private floorRepo : IFloorRepo
  
  ) {}


  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floorOrError = Floor.create(floorDTO);
      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();
      await this.floorRepo.save(floorResult);

      const floorDTOX = FloorMap.toDTO(floorResult) as IFloorDTO;

      return Result.ok<IFloorDTO>(floorDTOX);
    } catch (e) {
      throw e
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floorOrError = Floor.create(floorDTO);
      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.error.toString());
      }

      const floorResult = floorOrError.getValue();
      await this.floorRepo.save(floorResult);

      const floorDTOX = FloorMap.toDTO(floorResult);

      return Result.ok<IFloorDTO>(floorDTOX);
    } catch (e) {
      return Result.fail<IFloorDTO>(e);
    }
  }

  public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByBuildingId(floorId);
      if (!floor) {
        return Result.fail<IFloorDTO>("Building not found");
      }
  
      const floorDTO = FloorMap.toDTO(floor);
  
      return Result.ok<IFloorDTO>(floorDTO);
    } catch (e) {
      return Result.fail<IFloorDTO>(e);
    }
  }
  

  /*public async getBuildingMaxMinFloor (buildingId: string): Promise<Result<IBuildingDTO>> {
  
  }*/

  

}
