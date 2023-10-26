import { Container, Service, Inject } from 'typedi';
import config from '../../config';

import IRobotService from './IServices/IRobotService';
import { RobotMap } from "../mappers/RobotMap";
import  IRobotDTO  from '../dto/IRobotDTO';

import IRobotRepo from './IRepos/IRobotRepo';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { Robot } from '../domain/robot';
import { Result } from "../core/logic/Result";
import { RobotType } from '../domain/robotType';

@Service()
export default class RobotService implements IRobotService{
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
      @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo,
  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
   try{
    let robotType : RobotType;

    const robotTypeOrError = await this.getRobotType(robotDTO.type);
    if (robotTypeOrError.isFailure) {
      return Result.fail<IRobotDTO>(robotTypeOrError.errorValue());
    } else {
      robotType = robotTypeOrError.getValue();
    }

    const robotOrError = await Robot.create(robotDTO);

    if(robotOrError.isFailure){
      return Result.fail<IRobotDTO>(robotOrError.errorValue());
    }

    const robotResult = robotOrError.getValue();

    await this.robotRepo.save(robotResult);

    const robotDTOresult = RobotMap.toDTO(robotResult) as IRobotDTO;
    return Result.ok<IRobotDTO>(robotDTOresult);
  
   }catch(e){
    throw e;
   } 
  }

  public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try{
      let robotType : RobotType;
      const robot = await this.robotRepo.findByDomainId(robotDTO.id);

      if (robot === null){
        return Result.fail<IRobotDTO>("Robot not found");
    } else {

      const robotTypeOrError = await this.getRobotType(robotDTO.type);

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotTypeOrError.errorValue());
      } else {
        robot.type = robotDTO.type;
        robot.designation = robotDTO.designation;
        robot.serialNumber = robotDTO.serialNumber;
        robot.description = robotDTO.description;
        robot.available = robotDTO.available;

        await this.robotRepo.save(robot);
      }
      const robotDTOresult = RobotMap.toDTO(robot) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOresult);
    }
    
  } catch(e){
    throw e;
  }
}

  public async getRobot (robotId: string): Promise<Result<IRobotDTO>> {
    try{
      const robot = await this.robotRepo.findByDomainId(robotId);
      if (robot === null){
        return Result.fail<IRobotDTO>("Robot not found");
      } else {
        const robotDTOresult = RobotMap.toDTO(robot) as IRobotDTO;
        return Result.ok<IRobotDTO>(robotDTOresult);
      }
    }catch(e){
      return Result.fail<IRobotDTO>(e);
    }
  }

  public async getallRobots(): Promise<Result<Array<IRobotDTO>>> {
    try{
      const robots = await this.robotRepo.findAll();
      if (robots === null){
        return Result.fail<Array<IRobotDTO>>("Robot not found");
      } else {
        const robotDTOresult = robots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
        return Result.ok<Array<IRobotDTO>>(robotDTOresult);
      }
    }catch(e){
      throw e;
    }
  }

  public async getRobotType(type: string): Promise<Result<RobotType>> {
    const robotType = await this.robotTypeRepo.findByType(type);
    const found = !! robotType;

    if (!found) {
      return Result.fail<RobotType>('Robot Type not found');
    } else {
      return Result.ok<RobotType>(robotType);
    }
  }



  public async findByTask(type: string): Promise<Result<IRobotDTO[]>> {
    try{
      const robots = await this.robotRepo.findByTask(type);
      if (robots === null){
        return Result.fail<Array<IRobotDTO>>("Robot not found");
      } else {
        const robotDTOresult = robots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
        return Result.ok<Array<IRobotDTO>>(robotDTOresult);
      }
    }catch(e){
      throw e;
    }
  }

  public async findByDesignation(designation: string): Promise<Result<IRobotDTO[]>> {
    try{
      const robots = await this.robotRepo.findByDesignation(designation);
      if (robots === null){
        return Result.fail<Array<IRobotDTO>>("Robot not found");
      } else {
        const robotDTOresult = robots.map(robot => RobotMap.toDTO(robot) as IRobotDTO);
        return Result.ok<Array<IRobotDTO>>(robotDTOresult);
      }
    }catch(e){
      throw e;
    }
  }

  public async inhibitRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try{
      const robot = await this.robotRepo.findByDomainId(robotDTO.id);
      if (robot === null){
        return Result.fail<IRobotDTO>("Robot not found");
      } else {
        robot.available = robotDTO.available;
        await this.robotRepo.save(robot);
        const robotDTOresult = RobotMap.toDTO(robot) as IRobotDTO;
        return Result.ok<IRobotDTO>(robotDTOresult);
      }
    }catch(e){
      throw e;
    }
  }
}