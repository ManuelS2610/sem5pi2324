import { Floors } from 'src/app/interfaces/floors';
import { Component} from '@angular/core';
import { FloorService} from 'src/app/services/floor.service';



@Component({
    selector: 'app-floors',
    templateUrl: './floors.component.html',
    styleUrls: ['./floors.component.css']
  })
  export class FloorsComponent {
    ListFloors: Floors[] = [];
    data: Floors = {};
    displayedColumns: string[]= ['id','name','buildingName','description'];
  
    constructor(private floorService: FloorService) { }
  
    ngOnInit(): void {
      this.get();
    }
  
    createFloor(){
      console.log(this.data);
      this.floorService.createFloor(this.data).subscribe();
    };
  
    updateFloor(){
      this.floorService.updateFloor(this.data).subscribe();
    };

    get(){
      this.floorService.getFloors().subscribe(ListFloors=> this.ListFloors = ListFloors);
    }

    findFloorsByBuildingName(){
      if (this.data.buildingName) {
        this.floorService.getFloorsByBuildingName(this.data.buildingName).subscribe(ListFloors=> this.ListFloors = ListFloors);
      }
    }

    findFloorsWithPassages(){
      this.floorService.getFloorsWithPassages().subscribe(ListFloors=> this.ListFloors = ListFloors);
    }

  }