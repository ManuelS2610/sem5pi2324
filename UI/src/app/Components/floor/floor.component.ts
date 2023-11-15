import { Floors } from 'src/app/interfaces/floors';
import { Component} from '@angular/core';
import { FloorService} from 'src/app/services/floor.service';
import { FormBuilder,Validators} from '@angular/forms';
import { Elevator } from 'src/app/interfaces/elevator';
import { Passages } from 'src/app/interfaces/passages';
import { Rooms } from 'src/app/interfaces/rooms';


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
  
    constructor(private floorService: FloorService, private _formBuilder: FormBuilder) { }
  
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
    floor : Floors={};
    passages : Passages[]=[];
    elevator : Elevator={};
    rooms : Rooms[]=[];
    count=0;
    floorGroup = this._formBuilder.group({
      floorId: ['', Validators.required],
    });
    passageGroup = this._formBuilder.group({
      passageId: [],
      positionX1: [],
      positionY1: [],
      positionX2: [],
      positionY2: []
    });
    elevatorGroup = this._formBuilder.group({
      elevatorId: ['', Validators.required],
      positionX: ['', Validators.required],
      positionY: ['', Validators.required],
    });
    roomGroup = this._formBuilder.group({
      roomId: [''],
      positionX: [''],
      positionY: [''],
      distX: [''],
      distY: [''],
    });
    matrix: number[][] = [];
    numRows: number=0;
    numCols: number=0;

    initializeMatrix() {
      this.matrix = Array.from({ length: this.numRows }, () => Array(this.numCols));
    }
    addOrUpdateValue(row: number, col: number, value: number) {
      this.matrix[row][col] = value;
    }
    passage(){
      const newPassage: Passages = {
        id: this.passageGroup.value.passageId!,
        positionBuilding1: [Number(this.passageGroup.value.positionX1), Number(this.passageGroup.value.positionY1)],
        positionBuilding2: [Number(this.passageGroup.value.positionX2), Number(this.passageGroup.value.positionY2)],
      };
    
      // Push the new passage to the passages array
      this.passages.push(newPassage);
    
      // Clear the form values after adding a passage
      this.passageGroup.reset();
    };
    room(){
      const newRoom: Rooms = {
        id: this.roomGroup.value.roomId!,
        position: [Number(this.roomGroup.value.positionX), Number(this.roomGroup.value.positionY)],
        distX: Number(this.roomGroup.value.distX),
        distY: Number(this.roomGroup.value.distY),
      };
    
      // Push the new room to the rooms array
      this.rooms.push(newRoom);
    
      // Clear the form values after adding a room
      this.roomGroup.reset();
    };
    submit(){
      this.floor.id=this.floorGroup.value.floorId!;
      this.floor.map = this.matrix;
      this.elevator.id=this.elevatorGroup.value.elevatorId!;
      this.elevator.position = [Number(this.elevatorGroup.value.positionX), Number(this.elevatorGroup.value.positionY)];
      this.floorService.loadMap(this.floor,this.passages,this.elevator,this.rooms).subscribe();	
    };
  }