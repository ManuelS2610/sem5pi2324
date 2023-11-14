import { Component } from '@angular/core';
import { Elevator } from 'src/app/interfaces/elevator';
import { ElevatorService } from 'src/app/services/elevator.service';

@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.css']
})
export class ElevatorsComponent {
  ListElevators: Elevator[] = [];
  data: Elevator = {};
  displayedColumns: string[]= ['id','buildingName','floors'];
  displayedColumns2: string[]= ['floors'];

  constructor(private elevatorService: ElevatorService) { }

  ngOnInit(): void {
    this.get();
  }
  buildingName:string="";

  createElevator(){
    console.log(this.data);
    this.elevatorService.createElevator(this.data).subscribe();
  }

  updateElevator(){
    this.elevatorService.updateElevator(this.data).subscribe();
  };

  elevators: Elevator[] = [];
  get(){
   this.elevatorService.getElevator(this.buildingName).subscribe(elevators=> this.elevators = elevators);
  };
}
