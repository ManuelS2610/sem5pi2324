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
    positionBuilding1: number[];
    positionBuilding2: number[];
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

    get positionBuilding1(): number[] {
        return this.props.positionBuilding1;
    }

    get positionBuilding2(): number[] {
        return this.props.positionBuilding2;
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
    
    set positionBuilding1(value: number[]) {
        this.props.positionBuilding1 = value;
    }

    set positionBuilding2(value: number[]) {
        this.props.positionBuilding2 = value;
    }

    private constructor(props: PassageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(passageDTO:IPassageDTO,id?: UniqueEntityID): Result<Passage> {
        const building1 = passageDTO.building1;
        const building2 = passageDTO.building2;
        const pisobuilding1 = passageDTO.pisobuilding1;
        const pisobuilding2 = passageDTO.pisobuilding2;
        const positionBuilding1 = passageDTO.positionBuilding1;
        const positionBuilding2 = passageDTO.positionBuilding2;
        if (!!building1 === false || building1.length === 0 ) {
            return Result.fail<Passage>('Must provide a Building name')
          } else {
            const passage = new Passage({ 
            building1 : building1,
            building2: building2,
            pisobuilding1:pisobuilding1,
            pisobuilding2:pisobuilding2,
            positionBuilding1:positionBuilding1,
            positionBuilding2:positionBuilding2
            } , id);
            return Result.ok<Passage>( passage )
          }

    }
}