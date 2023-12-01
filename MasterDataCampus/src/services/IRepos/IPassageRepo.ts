import { Repo } from "../../core/infra/Repo";
import { Passage } from "../../domain/passage";
import { PassageId } from "../../domain/passageId";


export default interface IPassageRepo extends Repo<Passage> {
  save(passage: Passage): Promise<Passage>;
  findByDomainId (passageId: PassageId|string): Promise<Passage>;
  findByPisos (pisobuilding1: string,pisobuilding2: string): Promise<boolean>;
  findByPisosReverse (pisobuilding1: string,pisobuilding2: string): Promise<boolean>;
  findByBuildings (building1: string,building2: string): Promise<Passage[]>;
  getAll(): Promise<Passage[]>;
}