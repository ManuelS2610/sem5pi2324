import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import IPassageService from './IServices/IPassageService';
import { PassageMap } from "../mappers/PassageMap";
import { IPassageDTO } from '../dto/IPassageDTO';
import IPassageRepo from './IRepos/IPassageRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Passage } from '../domain/passage';
import { Result } from "../core/logic/Result";
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) { }


  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const building1 = await this.buildingRepo.findByName(passageDTO.building1);
      const found1 = !!building1;
      if (!found1) {
        return Result.fail<IPassageDTO>("Building1 not found");
      }
      const building2 = await this.buildingRepo.findByName(passageDTO.building2);
      const found2 = !!building2;
      if (!found2) {
        return Result.fail<IPassageDTO>("Building2 not found");
      }
      const floor1 = await this.floorRepo.findByName(passageDTO.pisobuilding1);
      const found3 = !!floor1;
      if (!found3) {
        return Result.fail<IPassageDTO>("Floor1 not found");
      }
      const floor2 = await this.floorRepo.findByName(passageDTO.pisobuilding2);
      const found4 = !!floor2;
      if (!found4) {
        return Result.fail<IPassageDTO>("Floor2 not found");
      }
      const exists = await this.passageRepo.findByPisos(passageDTO.pisobuilding1, passageDTO.pisobuilding2);
      console.log(exists);
      if (exists) {
        return Result.fail<IPassageDTO>("Passage already exists");
      }
      const exists2 = await this.passageRepo.findByPisosReverse(passageDTO.pisobuilding1, passageDTO.pisobuilding2);
      if (exists2) {
        return Result.fail<IPassageDTO>("Passage already exists");
      }
      const passageOrError = await Passage.create(passageDTO);

      if (passageOrError.isFailure) {
        return Result.fail<IPassageDTO>(passageOrError.errorValue());
      }

      const passageResult = passageOrError.getValue();

      await this.passageRepo.save(passageResult);

      const passageDTOX = PassageMap.toDTO(passageResult) as IPassageDTO;

      return Result.ok<IPassageDTO>(passageDTOX);
    } catch (e) {
      throw e
    }
  }

  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const building1 = await this.buildingRepo.findByName(passageDTO.building1);
      const found1 = !!building1;
      if (!found1) {
        return Result.fail<IPassageDTO>("Building1 not found");
      }
      const building2 = await this.buildingRepo.findByName(passageDTO.building2);
      const found2 = !!building2;
      if (!found2) {
        return Result.fail<IPassageDTO>("Building2 not found");
      }
      const floor1 = await this.floorRepo.findByName(passageDTO.pisobuilding1);
      const found3 = !!floor1;
      if (!found3) {
        return Result.fail<IPassageDTO>("Floor1 not found");
      }
      const floor2 = await this.floorRepo.findByName(passageDTO.pisobuilding2);
      const found4 = !!floor2;
      if (!found4) {
        return Result.fail<IPassageDTO>("Floor2 not found");
      }
      const exists = await this.passageRepo.findByPisos(passageDTO.pisobuilding1, passageDTO.pisobuilding2);
      console.log(exists);
      if (exists) {
        return Result.fail<IPassageDTO>("Passage already exists");
      }
      const exists2 = await this.passageRepo.findByPisosReverse(passageDTO.pisobuilding1, passageDTO.pisobuilding2);
      if (exists2) {
        return Result.fail<IPassageDTO>("Passage already exists");
      }
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);
      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      } else {
        passage.building1 = passageDTO.building1;
        passage.building2 = passageDTO.building2;
        passage.pisobuilding1 = passageDTO.pisobuilding1;
        passage.pisobuilding2 = passageDTO.pisobuilding2;

        await this.passageRepo.save(passage);

        const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;
        return Result.ok<IPassageDTO>(passageDTOResult);
      }
    } catch (e) {
      return Result.fail<IPassageDTO>(e);
    }
  }
  public async getPassagesBetween2Buildings(building1: string, building2: string): Promise<Result<Array<IPassageDTO>>> {
    try {
      const passages = await this.passageRepo.findByBuildings(building1, building2);

      if (passages === null) {
        return Result.fail<Array<IPassageDTO>>("Passages not found");
      } else {
        const passagesDTO = passages.map((passage) => PassageMap.toDTO(passage) as IPassageDTO);
        return Result.ok<Array<IPassageDTO>>(passagesDTO);
      }

    } catch (e) {
      throw e;
    }
  }
  public async updatePassagePosition(passageDTO: IPassageDTO, id: string): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);
      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      }
      const floor1= await this.floorRepo.findByName(passage.pisobuilding1);
      const floor2= await this.floorRepo.findByName(passage.pisobuilding2);
      console.log(floor1.id.toString());
;      if(floor1.id.toString()!=id && floor2.id.toString()!=id){
        return Result.fail<IPassageDTO>("Floor1 not found");
      }
      const building1 = await this.buildingRepo.findByName(passage.building1);
      if (building1.depth < passageDTO.positionBuilding1[0] || building1.width < passageDTO.positionBuilding1[1]) {
        return Result.fail<IPassageDTO>("Position out of bounds");
      }
      const building2 = await this.buildingRepo.findByName(passage.building2);
      if (building2.depth < passageDTO.positionBuilding2[0] || building2.width < passageDTO.positionBuilding2[1]) {
        return Result.fail<IPassageDTO>("Position out of bounds");
      }else{
      passage.positionBuilding1 = passageDTO.positionBuilding1;
      passage.positionBuilding2 = passageDTO.positionBuilding2;
      await this.passageRepo.save(passage);
      const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;
      return Result.ok<IPassageDTO>(passageDTOResult);}
    }
    catch (e) {
      return Result.fail<IPassageDTO>(e);
    }

  }
}
