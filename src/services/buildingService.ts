import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IBuildingService from './IServices/IBuildingService';
import { BuildingMap } from "../mappers/BuildingMap";
import {IBuildingDTO} from '../dto/IBuildingDTO';

import IBuildingRepo from './IRepos/IBuildingRepo';

import { Building } from '../domain/building';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingService implements IBuildingService{
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  
  ) {}


  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingOrError = Building.create(buildingDTO);
      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();
      await this.buildingRepo.save(buildingResult);

      const buildingDTOX = BuildingMap.toDTO(buildingResult) as IBuildingDTO;

      return Result.ok<IBuildingDTO>(buildingDTOX);
    } catch (e) {
      throw e
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingOrError = Building.create(buildingDTO);
      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.error.toString());
      }

      const buildingResult = buildingOrError.getValue();
      await this.buildingRepo.save(buildingResult);

      const buildingDTOX = BuildingMap.toDTO(buildingResult);

      return Result.ok<IBuildingDTO>(buildingDTOX);
    } catch (e) {
      return Result.fail<IBuildingDTO>(e);
    }
  }

  public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByBuildingId(buildingId);
      if (!building) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
  
      const buildingDTO = BuildingMap.toDTO(building);
  
      return Result.ok<IBuildingDTO>(buildingDTO);
    } catch (e) {
      return Result.fail<IBuildingDTO>(e);
    }
  }
  

  /*public async getBuildingMaxMinFloor (buildingId: string): Promise<Result<IBuildingDTO>> {
  
  }*/

  

}

  
