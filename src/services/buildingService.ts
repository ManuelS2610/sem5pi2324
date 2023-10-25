import {Service, Inject } from 'typedi';
import config from '../../config';
import IBuildingService from './IServices/IBuildingService';
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Building } from '../domain/building';
import { Result } from "../core/logic/Result";
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class BuildingService implements IBuildingService{
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
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

      if (buildings === null) {
        return Result.fail<Array<IBuildingDTO>>("Buildings not found");
      }else{
        const buildingsDTO = buildings.map((building) => BuildingMap.toDTO(building) as IBuildingDTO);
        return Result.ok<Array<IBuildingDTO>>(buildingsDTO);
      }
      
    } catch (e) {
      throw e;
    }
  }
  

  /*public async getBuildingMaxMinFloor (buildingId: string): Promise<Result<IBuildingDTO>> {
  
  }*/
  public async getBuildingsWithMinMaxFloors(minFloors: number, maxFloors: number): Promise<Result<Array<IBuildingDTO>>> {
    try {
      // Recupere todos os edifícios do repositório
      const buildings = await this.buildingRepo.findAll();
  
      if (buildings === null) {
        return Result.fail<Array<IBuildingDTO>>("Buildings not found");
      }
  
      const buildingsWithMinMaxFloors = [];
  
      for (const building of buildings) {
        // Recupere os pisos associados ao edifício usando o repositório de pisos
        const floors = await this.floorRepo.findFloorsByBuildingName(building.name);
  
        // Verifique se o número de pisos está dentro do intervalo mínimo e máximo
        if (floors.length >= minFloors && floors.length <= maxFloors) {
          buildingsWithMinMaxFloors.push(building);
        }
      }
  
      // Mapeie os edifícios filtrados para objetos DTO
      const buildingsDTO = buildingsWithMinMaxFloors.map((building) => BuildingMap.toDTO(building) as IBuildingDTO);
  
      return Result.ok<Array<IBuildingDTO>>(buildingsDTO);
    } catch (e) {
      throw e;
    }
  }
  

  

}

  
