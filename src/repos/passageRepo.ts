import { Service, Inject } from 'typedi';

import { Passage } from '../domain/passage';
import { PassageMap } from '../mappers/PassageMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';

import IPassageRepo from "../services/IRepos/IPassageRepo";
import { PassageId } from '../domain/passageId';

@Service()
export default class PassageRepo implements IPassageRepo {
  private models: any;

  constructor(
    @Inject('passageSchema') private passageSchema : Model<IPassagePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(passage: Passage): Promise<boolean> {
    
    const idX = passage.id instanceof PassageId ? (<PassageId>passage.id).toValue : passage.id;

    const query = { domainId: idX}; 
    const passageDocument = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document>);

    return !!passageDocument === true;
  }

  public async save (passage: Passage): Promise<Passage> {
    const query = { domainId: passage.id.toString()}; 

    const passageDocument = await this.passageSchema.findOne( query );

    try {

      if (passageDocument === null ) {

        const rawpassage: any = PassageMap.toPersistence(passage);

        const passageCreated = await this.passageSchema.create(rawpassage);
   
        return PassageMap.toDomain(passageCreated);
      } else {
        passageDocument.building1=passage.building1;
        passageDocument.building2=passage.building2;
        passageDocument.pisobuilding1=passage.pisobuilding1;
        passageDocument.pisobuilding2=passage.pisobuilding2;
        await passageDocument.save();

        return passage;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (passageId: string): Promise<Passage> {
    const query = { domainId: passageId};
    const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );

    if (passageRecord != null) {
      return PassageMap.toDomain(passageRecord);
    }
    return null;
  }

  public async findByPassageId (passageId: string): Promise<Passage> {
    const query = { passageId: passageId};
    const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );

    if (passageRecord != null) {
      return PassageMap.toDomain(passageRecord);
    }
    return null;
  }

 
}