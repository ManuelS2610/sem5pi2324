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

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.get();
  }

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
}
