import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IFloorService from './IServices/IFloorService';
import { FloorMap } from "../mappers/FloorMap";
import  IFloorDTO  from '../dto/IFloorDTO';

import IFloorRepo from './IRepos/IFloorRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Floor } from '../domain/floor';
import { Building } from '../domain/building';

import { Result } from "../core/logic/Result";
import { floor } from 'lodash';

@Service()
export default class FloorService implements IFloorService{
  constructor(
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
  
  ) {}


  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try{
      let building: Building;

      const buildingOrError = await this.getBuildingName(floorDTO.buildingName);
      if (buildingOrError.isFailure) {
        return Result.fail<IFloorDTO>(buildingOrError.errorValue());
      } else {
        building = buildingOrError.getValue();
      }

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

      let building: Building;
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);
      if (floor === null){
        return Result.fail<IFloorDTO>("Floor not found");
      }else{
        
     
      
        const buildingOrError = await this.getBuildingName(floorDTO.buildingName);
        if (buildingOrError.isFailure) {
          return Result.fail<IFloorDTO>(buildingOrError.errorValue());
        } else {
          
          floor.name = floorDTO.name;
          floor.buildingName = floorDTO.buildingName;
          floor.description = floorDTO.description;
          await this.floorRepo.save(floor);
        }

       

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
  



 private async getBuildingName (buildingName: string): Promise<Result<Building>> {

    const building = await this.buildingRepo.findByName(buildingName);
    const found = !!building;

    if (found) {
      return Result.ok<Building>(building);
    } else {
      return Result.fail<Building>("Building does not exist");
    }
  }

  public async getallFloors(): Promise<Result<Array<IFloorDTO>>> {
    try {
      const floors = await this.floorRepo.findAll();

      if (floors === null) {
        return Result.fail<Array<IFloorDTO>>("Floors not found");
      }else{
        const floorsDTO = floors.map((floor) => FloorMap.toDTO(floor) as IFloorDTO);
        return Result.ok<Array<IFloorDTO>>(floorsDTO);
      }
      
    } catch (e) {
      throw e;
    }
  }


  public async findFloorsByBuildingName(buildingName: string): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findFloorsByBuildingName(buildingName);

      if (floors === null) {
        return Result.fail<IFloorDTO[]>("Floors not found");
      }else{
        const floorsDTO = floors.map((floor) => FloorMap.toDTO(floor) as IFloorDTO);
        return Result.ok<IFloorDTO[]>(floorsDTO);
      }
      
    } catch (e) {
      throw e;
    }
  }


  public async loadMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>{
    try {
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);
      const rows = floorDTO.map.length;
      const cols = floorDTO.map[0].length;
      const building = await this.buildingRepo.findByName(floor.buildingName);
      if(rows!=building.depth || cols!=building.width || rows==0 || cols==0){
        return Result.fail<IFloorDTO>("Map size does not match building size");
      }
      if (floor === null){
        return Result.fail<IFloorDTO>("Floor not found");
      }else{
        floor.map=floorDTO.map;
        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  

}
