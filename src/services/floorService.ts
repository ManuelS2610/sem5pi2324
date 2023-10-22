import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IFloorService from './IServices/IFloorService';
import { FloorMap } from "../mappers/FloorMap";
import { IFloorDTO } from '../dto/IFloorDTO';

import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Floor } from '../domain/floor';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorService implements IFloorService{
  constructor(
      @Inject(config.repos.building.name) private floorRepo : IFloorRepo,
      @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
  
  ) {}


  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try{
      const floorOrError = await Floor.create(floorDTO);
      
      if(floorOrError.isFailure){
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOresult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOresult);
    }catch(e){
      throw e;
    } 
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);

      if (floor === null){
        return Result.fail<IFloorDTO>("Floor not found");
      }else{
    
        floor.name = floorDTO.name;
        floor.buildingName = floorDTO.buildingName;
        floor.description = floorDTO.description;
   

        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorId);
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
