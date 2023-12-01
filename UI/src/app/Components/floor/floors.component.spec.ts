import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { FloorsComponent } from './floor.component';
import { FloorService } from 'src/app/services/floor.service';
import { Floors } from 'src/app/interfaces/floors';
import { of } from 'rxjs';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

describe('FloorsComponent', () => {
  let component: FloorsComponent;
  let fixture: ComponentFixture<FloorsComponent>;
  let floorService: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorsComponent], // Change to FloorsComponent
      imports: [MatTabsModule, HttpClientTestingModule, MatStepperModule, MatFormFieldModule, MatSelectModule],
      providers: [FloorService] // Change to FloorService
    });
    fixture = TestBed.createComponent(FloorsComponent); // Change to FloorsComponent
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService); // Change to FloorService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method with correct data', () => {
    const newFloor: Floors = { 
      name: 'A1',
      description: 'Description of the new floor', 
      buildingName: 'A',
    };

    spyOn(floorService, 'createFloor').and.returnValue(of(newFloor)); // Change to createFloor

    component.data = newFloor; // Change to data

    component.createFloor(); // Change to createFloor

    expect(floorService.createFloor).toHaveBeenCalledWith(newFloor); // Change to createFloor
  });

  it('should call updateFloor method with correct data', () => {
    const updatedFloor: Floors = { // Change to Floors
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new floor', 
      buildingName: 'A',
    };

    spyOn(floorService, 'updateFloor').and.returnValue(of(updatedFloor)); // Change to updateFloor

    component.clickedRow = updatedFloor; // Change to clickedRow

    component.updateFloor(); // Change to updateFloor

    expect(floorService.updateFloor).toHaveBeenCalledWith(updatedFloor); // Change to updateFloor
  });

  it('should call getFloor method', () => {
    const floors: Floors[] = [{ // Change to Floors
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new floor', 
      buildingName: 'A',
    },
    {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'B1',
      description: 'Description of the new floor', // Change to floor
      buildingName: 'B',
    }];

    spyOn(floorService, 'getFloors').and.returnValue(of(floors)); // Change to getFloor

    component.get(); // Change to getFloors

    expect(floorService.getFloors).toHaveBeenCalled(); // Change to getFloor
  });
});

