import { Component } from '@angular/core';
import { Buildings } from 'src/app/interfaces/buildings';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent {
  ListBuildings: Buildings[] = [];
  data: Buildings = {};
  displayedColumns: string[]= ['id','name','description','depth','width'];
  displayedColumns2: string[]= ['id','name'];


  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.get();
    this.getMinMax();
  }

minFloors:string="";
maxFloors:string="";

  createBuilding(){
    console.log(this.data);
    this.buildingService.createBuilding(this.data).subscribe();
  };

  updateBuilding(){
    this.buildingService.updateBuilding(this.data).subscribe();
  };

  get(){
    this.buildingService.getBuilding().subscribe(ListBuildings=> this.ListBuildings = ListBuildings);
  }

  buildings: Buildings[] = [];
  getMinMax(){
   this.buildingService.getBuilding2(this.minFloors, this.maxFloors).subscribe(buildings=> this.buildings = buildings);
  };
}
