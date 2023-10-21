import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

import { BuildingId } from "./buildingId";
import  IBuildingDTO  from "../dto/IBuildingDTO";

interface BuildingProps {
  name: string;
  description: string;
  depth: number;
  width: number;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingId (): BuildingId {
    return new BuildingId(this.buildingId.toValue());
  }

  get name (): string {
    return this.props.name;
  }

  get description (): string {
    return this.props.description;
  }

  get depth (): number {
    return this.props.depth;
  }

  get width (): number {
    return this.props.width;
  }

  set name ( value: string) {
    this.props.name = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set depth ( value: number) {
    this.props.depth = value;
  }

  set width ( value: number) {
    this.props.width = value;
  }
  

  

  private constructor (props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (buildingDTO:IBuildingDTO, id?: UniqueEntityID): Result<Building> {
    const name = buildingDTO.name;
    const description = buildingDTO.description;
    const depth = buildingDTO.depth;
    const width = buildingDTO.width;

    if (!!name === false || name.length === 0 ) {
      return Result.fail<Building>('Must provide a Building name')
    } else {
      const building = new Building({ 
      name : name,
      description: description,
      depth:depth,
      width:width 
      } , id);
      return Result.ok<Building>( building )
    }

      
  }
}