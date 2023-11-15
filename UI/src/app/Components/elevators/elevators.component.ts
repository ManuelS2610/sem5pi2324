import { Component } from '@angular/core';
import { Elevator } from 'src/app/interfaces/elevator';
import { Floors } from 'src/app/interfaces/floors';
import { ElevatorService } from 'src/app/services/elevator.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.css']
})
export class ElevatorsComponent {
  ListElevators: Elevator[] = [];
  data: Elevator = {};
  displayedColumns: string[] = ['id', 'buildingName', 'floors'];
  displayedColumns2: string[] = ['floors'];
  floorName: string="";
  floors: string[]=[];
  
  constructor(private elevatorService: ElevatorService) { }

  ngOnInit(): void {
    this.get();
  }

  buildingName: string = "";

  createElevator() {
    this.data.buildingName;
    this.data.floors=this.floors;
    this.elevatorService.createElevator(this.data).subscribe();
  }

  updateElevator() {
    this.elevatorService.updateElevator(this.data).subscribe();
  }

  addFloor() {
    console.log(this.floorName);
    this.floors.push(this.floorName);
  }

  elevators: Elevator[] = [];
  get() {
    this.elevatorService.getElevator(this.buildingName).subscribe(elevators => this.elevators = elevators);
  }
}
