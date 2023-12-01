import { Component } from '@angular/core';
import { Rooms } from 'src/app/interfaces/rooms';
import { RoomsService} from 'src/app/services/room.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
    ListRooms: Rooms[] = [];
    data: Rooms = {};
    displayedColumns: string[] = ['category', 'description', 'floor'];
    clickedRow: Rooms = {};

    constructor(private roomService: RoomsService) { }
  
    ngOnInit(): void {
      
    }
  
    createRoom() {
      console.log(this.data);
      this.roomService.createRoom(this.data).subscribe();
    };
  
    updateRoom() {
      const body : Rooms = {
        id: this.clickedRow.id,
        category: this.clickedRow.category,
        description: this.clickedRow.description,
        floor: this.clickedRow.floor
      }
      this.roomService.updateRoom(body).subscribe();
    };

    get(){
      this.roomService.getRooms().subscribe(ListRooms=> this.ListRooms = ListRooms);
    }

    openUpdateTab(clickedRow: Rooms, tabGroup: MatTabGroup) {
      this.clickedRow = clickedRow; // Store the clicked row data
      tabGroup.selectedIndex = 1; // Set the index of the "Update Building" tab (0-indexed)
    }
  
    
  }