import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PassageId } from "./passageId";
import { IPassageDTO } from "../dto/IPassageDTO";

interface PassageProps {
    building1: string;
    building2: string;
    pisobuilding1: string;
    pisobuilding2: string;

}

export class Passage extends AggregateRoot<PassageProps>{
    get id(): UniqueEntityID {
        return this._id;
    }

    get passageId(): PassageId {
        return new PassageId(this.passageId.toValue());
    }

    get building1(): string {
        return this.props.building1;
    }

    get building2(): string {
        return this.props.building2;
    }

    get pisobuilding1(): string {
        return this.props.pisobuilding1;
    }

    get pisobuilding2(): string {
        return this.props.pisobuilding2;
    }

    set building1(value: string) {
        this.props.building1 = value;
    }

    set building2(value: string) {
        this.props.building2 = value;
    }

    set pisobuilding1(value: string) {
        this.props.pisobuilding1 = value;
    }

    set pisobuilding2(value: string) {
        this.props.pisobuilding2 = value;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(passageDTO:IPassageDTO,id?: UniqueEntityID): Result<Passage> {
        const building1 = passageDTO.building1;
        const building2 = passageDTO.building2;
        const pisobuilding1 = passageDTO.pisobuilding1;
        const pisobuilding2 = passageDTO.pisobuilding2;

        if (!!building1 === false || building1.length === 0 ) {
            return Result.fail<Passage>('Must provide a Building name')
          } else {
            const passage = new Passage({ 
            building1 : building1,
            building2: building2,
            pisobuilding1:pisobuilding1,
            pisobuilding2:pisobuilding2 
            } , id);
            return Result.ok<Passage>( passage )
          }

    }
}