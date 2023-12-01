import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RobotsComponent } from './robots.component';
import { RobotsService } from 'src/app/services/robots.service';
import { of } from 'rxjs';
import { Robots } from 'src/app/interfaces/robots';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


describe('RobotsComponent', () => {
  let component: RobotsComponent;
  let fixture: ComponentFixture<RobotsComponent>;
  let robotService: RobotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotsComponent],
      imports: [MatSelectModule,MatTabsModule,HttpClientTestingModule,MatFormFieldModule], // Import necessary modules (like MatTabsModule)
      providers: [RobotsService] // Provide mock or actual service here
    });
    fixture = TestBed.createComponent(RobotsComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotsService); // Get reference to the service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRobot method with correct data', () => {
    const newRobot: Robots = {
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    spyOn(robotService, 'createRobot').and.returnValue(of(newRobot));

    component.data = newRobot; // Set component data to the new robot

    component.createRobot();

    expect(robotService.createRobot).toHaveBeenCalledWith(newRobot);
  });

  it('should call updateRobot method with correct data', () => {
    const updatedRobot: Robots = {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    spyOn(robotService, 'updateRobot').and.returnValue(of(updatedRobot));


    component.clickedRow = updatedRobot; // Set component clickedRow to the updated robot



    component.updateRobot();

    expect(robotService.updateRobot).toHaveBeenCalledWith(updatedRobot);
  }
  );

  it('should call get method', () => {
    const mockRobot: Robots[] = [
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S244SDZ3',
        description: 'Teste',
        available: true
      },
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S243SDZ3',
        description: 'Teste',
        available: true
      }
    ];

    spyOn(robotService, 'getRobot').and.returnValue(of(mockRobot));

    component.get();

    expect(robotService.getRobot).toHaveBeenCalled();
    expect(component.ListRobots).toEqual(mockRobot);
  }
  );


  it('should create a robot', () => {

    const mockRobot: Robots = {
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    spyOn(robotService, 'createRobot').and.returnValue(of(mockRobot));

    component.data = mockRobot;

    component.createRobot();

    expect(robotService.createRobot).toHaveBeenCalledWith(mockRobot);
  });


 /* it('should call findByDesignation method', () => {
    const mockRobot: Robots[] = [
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S244SDZ3',
        description: 'Teste',
        available: true
      },
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S243SDZ3',
        description: 'Teste',
        available: true
      }
    ];

    spyOn(robotService, 'findByDesignation').and.returnValue(of(mockRobot));

    component.get();

    expect(robotService.findByDesignation).toHaveBeenCalled();
  }); 


/*  it('should call findByTask method', () => {
    const mockRobot: Robots[] = [
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S244SDZ3',
        description: 'Teste',
        available: true
      },
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        type:"Survaillance",
        designation: "Teste",
        serialNumber: 'SDSA232S243SDZ3',
        description: 'Teste',
        available: true
      }
    ];

    spyOn(robotService, 'findByTask').and.returnValue(of(mockRobot));

    component.get();

    expect(robotService.findByTask).toHaveBeenCalled();
  }); */
});
  