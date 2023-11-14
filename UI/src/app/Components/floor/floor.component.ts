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
    ListFloorsBuilding: Floors[] = [];
    ListFloorsPassages: Floors[] = [];
    data: Floors = {};
    displayedColumns: string[]= ['id','name','buildingName','description'];
    building:string="";
  
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
  
        this.floorService.getFloorsByBuildingName(this.building).subscribe(ListFloorsBuilding=> this.ListFloorsBuilding = ListFloorsBuilding);
      
    }

    findFloorsWithPassages(){
      this.floorService.getFloorsWithPassages().subscribe(ListFloorsPassages=> this.ListFloorsPassages = ListFloorsPassages);
    }

  }