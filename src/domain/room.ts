import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

import { RoomId } from "./roomId";
import IRoomDTO from "../dto/IRoomDTO";

interface RoomProps {
  category: string;
  description: string;
  floor: string;
}

export class Room extends AggregateRoot<RoomProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roomId (): RoomId {
    return new RoomId(this.roomId.toValue());
  }

  get category (): string {
    return this.props.category;
  }

  get description (): string {
    return this.props.description;
  }

  get floor (): string {
    return this.props.floor;
  }

  set category ( value: string) {
    this.props.category = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set floor ( value: string) {
    this.props.floor = value;
  }
  

  

  private constructor (props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roomDTO:IRoomDTO, id?: UniqueEntityID): Result<Room> {

    const category = roomDTO.category;
    const description = roomDTO.description;
    const floor = roomDTO.floor;

    const room = new Room({
       category: category,
       description: description, 
       floor:floor
    }, id);
    return Result.ok<Room>(room);
  }

}