import { Floor } from "../domain/floor";

export interface IElevatorPersistence {
    domainId: string;
    name: string;
    buildingName: string;
    floor: Floor[];
  }