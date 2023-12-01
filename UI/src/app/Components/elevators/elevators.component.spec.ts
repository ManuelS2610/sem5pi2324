import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { ElevatorsComponent } from './elevators.component';
import { ElevatorService } from 'src/app/services/elevator.service';
import { of } from 'rxjs';
import { Elevator } from 'src/app/interfaces/elevator';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
describe('ElevatorsComponent', () => {
  let component: ElevatorsComponent;
  let fixture: ComponentFixture<ElevatorsComponent>;
  let elevatorService: ElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorsComponent],
      imports: [MatTabsModule,HttpClientTestingModule], // Import necessary modules (like MatTabsModule)
      providers: [ElevatorService] // Provide mock or actual service here
    });
    fixture = TestBed.createComponent(ElevatorsComponent);
    component = fixture.componentInstance;
    elevatorService = TestBed.inject(ElevatorService); // Get reference to the service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createElevator method with correct data', () => {
    const newElevator: Elevator = {
      buildingName: 'X',
      floors: ["X1"]
    };

    spyOn(elevatorService, 'createElevator').and.returnValue(of(newElevator));

    component.data = newElevator; // Set component data to the new elevator

    component.createElevator();

    expect(elevatorService.createElevator).toHaveBeenCalledWith(newElevator);
  });

  it('should call updateElevator method with correct data', () => {
    const updatedElevator: Elevator = {
      id: '123',
      buildingName: 'X',
      floors: []
    };

    spyOn(elevatorService, 'updateElevator').and.returnValue(of(updatedElevator));


    component.clickedRow = updatedElevator; // Set component clickedRow to the updated elevator


    component.updateElevator();
  

    expect(elevatorService.updateElevator).toHaveBeenCalledWith(updatedElevator);
  }
  );

  it('should call getElevator method', () => {
    const elevator: Elevator[] = [{
      id: '123',
      buildingName: 'X',
      floors: ["X1"]
    },
    {
      id: '123',
      buildingName: 'X',
      floors: ["X1"]
    },];

    spyOn(elevatorService, 'getElevator').and.returnValue(of(elevator));

    component.get();

    expect(elevatorService.getElevator).toHaveBeenCalled();
  });
});


