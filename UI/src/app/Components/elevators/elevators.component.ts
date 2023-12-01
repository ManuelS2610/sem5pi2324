import { Component } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
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
  displayedColumns: string[] = ['buildingName', 'floors'];
  displayedColumns2: string[] = ['floors'];
  floorName: string="";
  floors: string[]=[];

  clickedRow: Elevator = {};
  
  constructor(private elevatorService: ElevatorService) { }

  ngOnInit(): void {
  }

  buildingName: string = "";

  createElevator() {
    this.data.buildingName;
    this.data.floors=this.floors;
    this.elevatorService.createElevator(this.data).subscribe();
  }

  updateElevator(){
    
    const body : Elevator = 
    {
      id: this.clickedRow.id,
      buildingName: this.clickedRow.buildingName,
      floors: this.floors,
    }
    this.elevatorService.updateElevator(body).subscribe();
  };

  addFloor() {
    this.floors.push(this.floorName);
  }

  elevators: Elevator[] = [];
  get() {
    this.elevatorService.getElevator(this.buildingName).subscribe(elevators => this.elevators = elevators);
  }
  e: Elevator[] = [];
  getServed() {
    this.elevatorService.getElevator2(this.buildingName).subscribe(e => this.e = e);
  }

  openUpdateTab(clickedRow: Elevator, tabGroup: MatTabGroup) {
    this.clickedRow = clickedRow; // Store the clicked row data
    tabGroup.selectedIndex = 1; // Set the index of the "Update Elevator" tab (0-indexed)
  }
}
