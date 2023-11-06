import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Interface } from "readline";
import BuildingRepo from "../repos/buildingRepo";
import { Building } from "./building";
import { FloorId } from "./floorId";
import  IFloorDTO  from "../dto/IFloorDTO";
import { floor } from "lodash";

interface FloorProps {
  name: string;
  buildingName: string;
  description: string;
  map: number[][];
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): FloorId {
    return new FloorId(this.floorId.toValue());
  }

  get name (): string {
    return this.props.name;
  }


  get buildingName (): string{
    return this.props.buildingName;
  }
  get description (): string {
    return this.props.description;
  }
  get map (): number[][] {
    return this.props.map;
  }


  set name ( value: string) {
    this.props.name = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set buildingName ( value: string) {
    this.props.buildingName = value;
  }

  set map ( value: number[][] ) {
    this.props.map = value;
  }

  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor> {

    const name = floorDTO.name;
    const buildingName = floorDTO.buildingName;
    const description = floorDTO.description;

    if (!!name === false || name.length === 0 ) {
      return Result.fail<Floor>('Must provide a Floor name')
    } else {
      const floor = new Floor({ 
      name : name,
      buildingName: buildingName,
      description: description,
      map: floorDTO.map,
      } , id);
      return Result.ok<Floor>( floor )
    }

      
  }
}