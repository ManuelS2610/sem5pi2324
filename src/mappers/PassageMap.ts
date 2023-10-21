import { Container } from 'typedi';
import { Mapper } from "../core/infra/Mapper";
import { IPassageDTO } from '../dto/IPassageDTO';
import { Passage } from "../domain/passage";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import PassageRepo from "../repos/passageRepo";
import { Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import { Document } from 'mongodb';

export class PassageMap extends Mapper<Passage> {
    public static toDTO(passage: Passage): IPassageDTO {
        return {
            id: passage.id.toString(),
            building1: passage.building1,
            building2: passage.building2,
            pisobuilding1: passage.pisobuilding1,
            pisobuilding2: passage.pisobuilding2,
        } as IPassageDTO;
    }

    public static toDomain(passage: any|Model<IPassagePersistence & Document>): Passage {
        const passageOrError = Passage.create(
            passage,
            new UniqueEntityID(passage.domainId)
            );

        passageOrError.isFailure ? console.log(passageOrError.error) : '';
        return passageOrError.isSuccess ? passageOrError.getValue() : null;
    }

    public static toPersistence(passage: Passage): any {
        const a = {
            domainId: passage.id.toString(),
            building1: passage.building1,
            building2: passage.building2,
            pisobuilding1: passage.pisobuilding1,
            pisobuilding2: passage.pisobuilding2,
        }
        return a;
    }

}