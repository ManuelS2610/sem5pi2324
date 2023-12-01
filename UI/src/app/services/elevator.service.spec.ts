import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';
import { Elevator } from '../interfaces/elevator'; // Import the Buildings interface

describe('ElevatorService', () => {
  let service: ElevatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorService]
    });
    service = TestBed.inject(ElevatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a elevator', () => {
    const mockElevator: Elevator = {  // Use elevators interface to define the mockElevator
      id: '123',
      buildingName: 'X',
      floors: ["X1"]
    };

    service.createElevator(mockElevator).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toBe('POST');
    req.flush(mockElevator);
  });

  it('should send a PUT request to update a building', () => {
    const mockElevator: Elevator = {  // Use Elevators interface to define the mockElevator
      id: '123',
      buildingName: 'X',
      floors: ["X1"]
    };

    service.updateElevator(mockElevator).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toBe('PUT');
    req.flush(mockElevator);
  });

  it('should send a GET request to get a elevator', () => {
    const mockElevator: Elevator = {  // Use Elevators interface to define the mockElevator
      id: '123',
      buildingName: 'X',
      floors: ["X1"]
    };

    service.getElevator(mockElevator.buildingName).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });
    

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators/X');
    expect(req.request.method).toBe('GET');
    req.flush(mockElevator);
  });
  
});
