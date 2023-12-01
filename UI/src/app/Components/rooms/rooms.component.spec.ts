import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RoomsComponent } from './rooms.component';
import { RoomsService } from 'src/app/services/room.service';
import { of } from 'rxjs';
import { Rooms } from 'src/app/interfaces/rooms'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomService: RoomsService; // Update service name

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent], // Update component name
      imports: [MatTabsModule, HttpClientTestingModule],
      providers: [RoomsService] // Update service name
    });
    fixture = TestBed.createComponent(RoomsComponent); // Update component name
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomsService); // Update service name
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRoom method with correct data', () => {
    const newRoom: Rooms = { // Update interface name
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      category: 'Gabinete',
      description: 'Description of the new room', // Update description
      floor: 'A1',
     
    };

    spyOn(roomService, 'createRoom').and.returnValue(of(newRoom));

    component.data = newRoom; // Update variable name

    component.createRoom(); // Update method name

    expect(roomService.createRoom).toHaveBeenCalledWith(newRoom);
  });

  it('should call updateRoom method with correct data', () => {
    const updatedRoom: Rooms = { // Update interface name
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      category: 'Gabinete',
      description: 'Description of the new room', // Update description
      floor: 'A1',
     
    };

    spyOn(roomService, 'updateRoom').and.returnValue(of(updatedRoom));

   component.clickedRow = updatedRoom; 

    component.updateRoom(); 

    expect(roomService.updateRoom).toHaveBeenCalledWith(updatedRoom);
  });

  it('should call getRoom method', () => {
    const rooms: Rooms[] = [ 
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        category: 'Gabinete',
        description: 'Description of the new room', // Update description
        floor: 'A1',
      },
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        category: 'Gabinetee',
        description: 'Description of the new test room', // Update description
        floor: 'A1',
      },
    ];

    spyOn(roomService, 'getRooms').and.returnValue(of(rooms));

    component.get();

    expect(roomService.getRooms).toHaveBeenCalled();
  });
});

