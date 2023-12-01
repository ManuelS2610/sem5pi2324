import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';
import { Floors } from '../interfaces/floors'; 
import { MatStepper } from '@angular/material/stepper';
import { Passages } from '../interfaces/passages';

describe('FloorService', () => {
  let service: FloorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService]
    });
    service = TestBed.inject(FloorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a Floor', () => {
    const mockFloor: Floors = {  
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new building',
      buildingName: 'A',
      
    };

    service.createFloor(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toBe('POST');
    req.flush(mockFloor);
  });

  it('should send a PUT request to update a floor', () => {
    const mockFloor: Floors = {  
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new building',
      buildingName: 'A',
    };

    service.updateFloor(mockFloor).subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toBe('PUT');
    req.flush(mockFloor);
  });

  it('should send a GET request to get all floors', () => {
    const mockFloor: Floors = {  
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new building',
      buildingName: 'A',
    };

    service.getFloors().subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/allFloors');
    expect(req.request.method).toBe('GET');
    req.flush(mockFloor);
  });

  it('should send a GET request to get a floor from a specific building', () => {
    const mockFloor: Floors = {  
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new building',
      buildingName: 'A',
    };

    service.getFloorsByBuildingName('A').subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/A');
    expect(req.request.method).toBe('GET');
    req.flush(mockFloor);
  });



  it('should send a GET request to get all floors with passages', () => {
    const mockPassage: Passages = {
      id: '70f0d29f-2361-41e4-9114-1f5c2bfa08ac',
      building1: 'A',
      building2: 'B',
      pisobuilding1: 'A1',
      pisobuilding2: 'B1',
    
    
    };
    const mockFloor: Floors = {  
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A1',
      description: 'Description of the new building',
      buildingName: 'A',
    };

    service.getFloorsWithPassages().subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/passages');
    expect(req.request.method).toBe('GET');
    req.flush(mockFloor);
  });

  
  
});
