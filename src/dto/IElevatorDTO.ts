import { Floor } from "../domain/floor";

export interface IElevatorDTO {
    id: string;
    name: string;
    buildingName: string;
    floors: Floor[];
  }