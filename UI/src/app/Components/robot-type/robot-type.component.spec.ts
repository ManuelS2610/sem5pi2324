import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RobotTypeComponent } from './robot-type.component';
import { RobotTypeService } from 'src/app/services/robot-type.service';
import { of } from 'rxjs';
import { RobotType } from 'src/app/interfaces/robotType';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';


describe('RobotTypeComponent', () => {
  let component: RobotTypeComponent;
  let fixture: ComponentFixture<RobotTypeComponent>;
  let robotTypeService: RobotTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotTypeComponent],
      imports: [MatTabsModule,HttpClientTestingModule], // Import necessary modules (like MatTabsModule)
      providers: [RobotTypeService] // Provide mock or actual service here
    });
    fixture = TestBed.createComponent(RobotTypeComponent);
    component = fixture.componentInstance;
    robotTypeService = TestBed.inject(RobotTypeService); // Get reference to the service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRobotType method with correct data', () => {
    const newRobotType: RobotType = {
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    };

    spyOn(robotTypeService, 'createRobotType').and.returnValue(of(newRobotType));

    component.data = newRobotType; // Set component data to the new robotType

    component.createRobotType();

    expect(robotTypeService.createRobotType).toHaveBeenCalledWith(newRobotType);
  });

  it('should call updateRobotType method with correct data', () => {
    const updatedRobotType: RobotType = {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    };

    spyOn(robotTypeService, 'updateRobotType').and.returnValue(of(updatedRobotType));


    component.clickedRow = updatedRobotType; // Set component clickedRow to the updated robotType


    component.updateRobotType();

    expect(robotTypeService.updateRobotType).toHaveBeenCalledWith(updatedRobotType);

  });

  it('should call get method with correct data', () => {
    const newRobotType: RobotType[] = [{
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    },
    {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    }];

    spyOn(robotTypeService, 'getRobotType').and.returnValue(of(newRobotType));

    component.get();

    expect(robotTypeService.getRobotType).toHaveBeenCalled();
  }
  );




});

  

