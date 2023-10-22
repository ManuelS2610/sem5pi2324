import {Service, Inject } from 'typedi';
import config from '../../config';
import IBuildingService from './IServices/IBuildingService';
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Building } from '../domain/building';
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingService implements IBuildingService{
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try{
      const buildingOrError = await Building.create(buildingDTO);
      
      if(buildingOrError.isFailure){
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOresult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOresult);
    }catch(e){
      throw e;
    } 
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

      if (building === null){
        return Result.fail<IBuildingDTO>("Building not found");
      }else{
        building.name = buildingDTO.name;
        building.description = buildingDTO.description;
        building.depth = buildingDTO.depth;
        building.width = buildingDTO.width;

        await this.buildingRepo.save(building);

        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

 public async getallBuildings(): Promise<Result<Array<IBuildingDTO>>> {
    try {
      const buildings = await this.buildingRepo.findAll();
      const buildingsDTO = buildings.map((building) => BuildingMap.toDTO(building) as IBuildingDTO);
      return Result.ok<Array<IBuildingDTO>>(buildingsDTO);
    } catch (e) {
      throw e;
    }
  }
  

  /*public async getBuildingMaxMinFloor (buildingId: string): Promise<Result<IBuildingDTO>> {
  
  }*/

  

}

  
