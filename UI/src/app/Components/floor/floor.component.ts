import { Floors } from 'src/app/interfaces/floors';
import { Component} from '@angular/core';
import { FloorService} from 'src/app/services/floor.service';
import { FormBuilder,FormControl,Validators} from '@angular/forms';
import { Elevator } from 'src/app/interfaces/elevator';
import { Passages } from 'src/app/interfaces/passages';
import { Rooms } from 'src/app/interfaces/rooms';
import { ElevatorService } from 'src/app/services/elevator.service';
import { RoomsService} from 'src/app/services/room.service';
import { PassageService} from 'src/app/services/passage.service';
import { MatTabGroup } from '@angular/material/tabs';


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
    displayedColumns: string[]= ['name','buildingName','description'];
    building:string="";
    selectedFloorId = ""; 
    floorControl = new FormControl();
    buildingName: string = "";
    elevators: Elevator[] = [];
    elevatorControl= new FormControl();
    selectedElevatorId = "";
    roomControl = new FormControl();
    roomsList: Rooms[] = [];
    selectedRoomId="";
    selectedFloorName = "";
    passageList: Passages[] = [];
    passageControl = new FormControl();
    selectedPassageId = "";
    b1:string="";
    b2:string="";

    clickedRow: Floors = {};

  
    constructor(private floorService: FloorService, private _formBuilder: FormBuilder, private elevatorService : ElevatorService,private roomService : RoomsService,private passageService:PassageService) { }
  
    ngOnInit(): void {
      this.get();
    }
  
    createFloor(){
      console.log(this.data);
      this.floorService.createFloor(this.data).subscribe();
    };
  
    updateFloor(){
      const body : Floors = {
        id: this.clickedRow.id,
        name: this.clickedRow.name,
        description: this.clickedRow.description,
        buildingName: this.clickedRow.buildingName
      }
      this.floorService.updateFloor(body).subscribe();
    };

    get(){
      this.floorService.getFloors().subscribe(ListFloors=> this.ListFloors = ListFloors);
    }
    getElevators(){
      this.elevatorService.getElevator(this.buildingName).subscribe(elevators => this.elevators = elevators);
    }
    getRooms(){
      this.roomService.getRoomByFloor(this.selectedFloorName).subscribe(roomsList => this.roomsList = roomsList);
    }

    findFloorsByBuildingName(){
        this.floorService.getFloorsByBuildingName(this.building).subscribe(ListFloorsBuilding=> this.ListFloorsBuilding = ListFloorsBuilding);
    }
    getPassage(){
      this.passageService.getPassage(this.b1,this.b2).subscribe(passage=> this.passageList = passage);
     };
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
        id: this.selectedPassageId,
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
        id: this.selectedRoomId!,
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
      this.floor.id=this.selectedFloorId!;
      this.floor.map = this.matrix;
      this.elevator.id=this.selectedElevatorId!;
      this.elevator.position = [Number(this.elevatorGroup.value.positionX), Number(this.elevatorGroup.value.positionY)];
      this.floorService.loadMap(this.floor,this.passages,this.elevator,this.rooms).subscribe();	
    };

    onFloorSelectionChange() {
      this.selectedFloorName = this.floorControl.value;
      const selectedFloor = this.ListFloors.find(floor => floor.name === this.selectedFloorName);

      if (selectedFloor) {

        this.selectedFloorId = selectedFloor.id!;
        this.buildingName=selectedFloor.buildingName!;
      }
    }
    onElevatorSelectionChange(){
      const selectedElevatorName = this.elevatorControl.value;
      const elevator = this.elevators.find(el => el.buildingName === selectedElevatorName);

      if (elevator) {

        this.selectedElevatorId = elevator.id!;
      }
    }
    onRoomSelectionChange(){
      const selectedRoomName = this.roomControl.value;
      const room = this.roomsList.find(rooms => rooms.description === selectedRoomName);
      if (room) {
        this.selectedRoomId = room.id!;
      }
    }
    onPassageSelectionChange(){
      const selectedPassageName = this.passageControl.value;
      const passage = this.passageList.find(passage => passage.pisobuilding1 === selectedPassageName);
      if (passage) {
        this.selectedPassageId = passage.id!;
      }
    }
    search(){
      this.getPassage();
    }

    openUpdateTab(clickedRow: Floors, tabGroup: MatTabGroup) {
      this.clickedRow = clickedRow; // Store the clicked row data
      tabGroup.selectedIndex = 1; // Set the index of the "Update Floor" tab (0-indexed)
    }
  }