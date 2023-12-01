import { Component } from '@angular/core';
import { Buildings } from 'src/app/interfaces/buildings';
import { BuildingService } from 'src/app/services/building.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent {
  ListBuildings: Buildings[] = [];
  data: Buildings = {};
  displayedColumns: string[]= ['name','description','depth','width'];
  displayedColumns2: string[]= ['name'];

//clickedrow list
  clickedRow: Buildings = {};


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
    const body : Buildings = {
      id: this.clickedRow.id,
      name: this.clickedRow.name,
      description: this.clickedRow.description,
      depth: this.clickedRow.depth,
      width: this.clickedRow.width
    }
    this.buildingService.updateBuilding(body).subscribe();
  };

  get(){
    this.buildingService.getBuilding().subscribe(ListBuildings=> this.ListBuildings = ListBuildings);
  }

  buildings: Buildings[] = [];
  getMinMax(){
   this.buildingService.getBuilding2(this.minFloors, this.maxFloors).subscribe(buildings=> this.buildings = buildings);
  };

  openUpdateTab(clickedRow: Buildings, tabGroup: MatTabGroup) {
    this.clickedRow = clickedRow; // Store the clicked row data
    tabGroup.selectedIndex = 1; // Set the index of the "Update Building" tab (0-indexed)
  }
}
