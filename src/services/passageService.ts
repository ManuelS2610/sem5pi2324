import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import IPassageService from './IServices/IPassageService';
import { PassageMap } from "../mappers/PassageMap";
import { IPassageDTO } from '../dto/IPassageDTO';
import IPassageRepo from './IRepos/IPassageRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Passage } from '../domain/passage';
import { Result } from "../core/logic/Result";

@Service()
export default class PassageService implements IPassageService {
  constructor(
    @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) { }


  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      /*const building1 = await this.buildingRepo(passageDTO.building1);
      const found1 = !!building1;
      if (!found1) {
        return Result.fail<IPassageDTO>("Building1 not found");
      }*/
      /*const building2 = await this.buildingRepo.findByBuildingId(passageDTO.building2);
      const found2 = !!building2;
      if (!found2) {
        return Result.fail<IPassageDTO>("Building2 not found");
      }*/
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
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);
      if(passage === null){
        return Result.fail<IPassageDTO>("Passage not found");
      }else{
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
}


