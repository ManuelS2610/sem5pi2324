import { Component } from '@angular/core';
import { Rooms } from 'src/app/interfaces/rooms';
import { RoomsService} from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
    ListRooms: Rooms[] = [];
    data: Rooms = {};
    displayedColumns: string[] = ['id', 'category', 'description', 'floor'];

    constructor(private roomService: RoomsService) { }
  
    ngOnInit(): void {
      this.get();
    }
  
    createRoom() {
      console.log(this.data);
      this.roomService.createRoom(this.data).subscribe();
    };
  
    updateRoom() {
      this.roomService.updateRoom(this.data).subscribe();
    };
  
    get() {
      this.roomService.getRoom().subscribe(ListRooms => this.ListRooms = ListRooms);
    }
  }