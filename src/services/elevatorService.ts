import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IElevatorService from './IServices/IElevatorService';
import { ElevatorMap } from "../mappers/ElevatorMap";
import {IElevatorDTO} from '../dto/IElevatorDTO';

import IElevatorRepo from './IRepos/IElevatorRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Elevator } from '../domain/elevator';

import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorService implements IElevatorService{
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
      @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo

  ) {}


 
  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try{
      const elevatorOrError = await Elevator.create(elevatorDTO);
      
      if(elevatorOrError.isFailure){
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);

      const elevatorDTOresult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOresult);
    }catch(e){
      throw e;
    } 
  }

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainID(elevatorDTO.id);

      if (elevator === null){
        return Result.fail<IElevatorDTO>("Elevator not found");
      }else{
    
        elevator.name= elevatorDTO.name;
        elevator.buildingName = elevatorDTO.buildingName;
   

        await this.elevatorRepo.save(elevator);

        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getElevator(elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainID(elevatorId);
      if (!elevator) {
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
  
      const elevatorDTO = ElevatorMap.toDTO(elevator);
  
      return Result.ok<IElevatorDTO>(elevatorDTO);
    } catch (e) {
      return Result.fail<IElevatorDTO>(e);
    }
  }

  /*public async getelevatorMaxMinFloor (elevatorId: string): Promise<Result<IelevatorDTO>> {
  
  }*/

  

}

  
