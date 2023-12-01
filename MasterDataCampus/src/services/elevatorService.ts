import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import IElevatorService from './IServices/IElevatorService';
import { ElevatorMap } from "../mappers/ElevatorMap";
import { IElevatorDTO } from '../dto/IElevatorDTO';

import IElevatorRepo from './IRepos/IElevatorRepo';
import { Elevator } from '../domain/elevator';
import IFloorRepo from './IRepos/IFloorRepo';

import { Result } from "../core/logic/Result";
import IBuildingRepo from './IRepos/IBuildingRepo';
import e from 'express';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
  ) { }



  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {

      const elevator1 = await this.buildingRepo.findByName(elevatorDTO.buildingName);
      const found1 = !!elevator1;
      if (!found1) {
        return Result.fail<IElevatorDTO>(`Building not found`);
      }

      const existsInBuilding = await this.elevatorRepo.checkIfBuildingHasElevator(elevatorDTO.buildingName);
      const found3 = !!existsInBuilding;
      if (!found3) {
        return Result.fail<IElevatorDTO>(`Elevator already exists in the building`);
      }

      for (const floorName of elevatorDTO.floors) {

        const elevator2 = await this.floorRepo.findByName(floorName);
        if(elevator2.buildingName != elevatorDTO.buildingName){
          return Result.fail<IElevatorDTO>(`Floor not found: ${floorName}`);
        }
        
        const found2 = !!elevator2;
        if (!found2) {
          return Result.fail<IElevatorDTO>(`Floor not found: ${floorName}`);
        }
        
      }


      

      const elevatorOrError = await Elevator.create(elevatorDTO);
      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);

      const elevatorDTOresult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOresult);
    } catch (e) {
      throw e;
    }
  }

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainID(elevatorDTO.id);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Elevator not found");
      } else {

        elevator.buildingName = elevatorDTO.buildingName;
        elevator.floors = elevatorDTO.floors;


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

  public async getElevatorsInBuilding(buildingName: string): Promise<Result<Array<IElevatorDTO>>> {
    try {

      const building = await this.buildingRepo.findByName(buildingName);

      if (!building) {
        return Result.fail<Array<IElevatorDTO>>(`Building not found: ${buildingName}`);
      }

      const elevators = await this.elevatorRepo.listByBuildingName(buildingName);

      if (!elevators || elevators.length === 0) {
        return Result.fail<Array<IElevatorDTO>>("No elevators found in the specified building");
      } else {
        const elevatorsDTO = elevators.map((elevator) => ElevatorMap.toDTO(elevator) as IElevatorDTO);
        return Result.ok<Array<IElevatorDTO>>(elevatorsDTO);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getFloorsServedByElevatorsInBuilding(buildingName: string): Promise<Result<string[]>> {
    try {
      const building = await this.buildingRepo.findByName(buildingName);

      if (!building) {
        return Result.fail<string[]>("Building not found");
      }

      const elevators = await this.elevatorRepo.listByBuildingName(buildingName);

      if (!elevators || elevators.length === 0) {
        return Result.fail<string[]>("No elevators found in the specified building");
      }

      const servedFloors: string[] = [];

      for (const elevator of elevators) {
        servedFloors.push(...elevator.floors);
      }

      if (servedFloors.length === 0) {
        return Result.fail<string[]>("No floors served by elevators in the specified building");
      }

      return Result.ok<string[]>(servedFloors);
    } catch (e) {
      return Result.fail<string[]>(e.message);
    }
  }
  public async updatePosition(elevatorDTO: IElevatorDTO,id:string): Promise<Result<IElevatorDTO>> {
    try{
      const elevator= await this.elevatorRepo.findByDomainID(elevatorDTO.id);
      if(elevator===null){
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
      let found = false;
      for(const floor of elevator.floors){
        const floor1 = await this.floorRepo.findByName(floor);
        if(floor1.id.toString()!=id){
        }else{
          found = true;
          break;
        }
      }
      if(found==false){
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
      const building = await this.buildingRepo.findByName(elevator.buildingName);
      if(building.depth < elevatorDTO.position[0] || building.width < elevatorDTO.position[1]){
        return Result.fail<IElevatorDTO>("Position out of bounds");
      }else{
        elevator.position = elevatorDTO.position;
        await this.elevatorRepo.save(elevator);
        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    }catch(e){
      return Result.fail<IElevatorDTO>(e);
    }
  }

  public async getAllElevators(): Promise<Result<Array<IElevatorDTO>>> {
    try {
      const elevators = await this.elevatorRepo.findAll();
      if (!elevators || elevators.length === 0) {
        return Result.fail<Array<IElevatorDTO>>("No elevators found");
      } else {
        const elevatorsDTO = elevators.map((elevator) => ElevatorMap.toDTO(elevator) as IElevatorDTO);
        return Result.ok<Array<IElevatorDTO>>(elevatorsDTO);
      }
    } catch (e) {
      throw e;
    }
  }

}


