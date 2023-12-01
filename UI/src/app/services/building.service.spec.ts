import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './building.service';
import { Buildings } from '../interfaces/buildings'; // Import the Buildings interface

describe('BuildingService', () => {
  let service: BuildingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService]
    });
    service = TestBed.inject(BuildingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a building', () => {
    const mockBuilding: Buildings = {  // Use Buildings interface to define the mockBuilding
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A',
      description: 'Edificio de Engenhariaaa',
      depth: '5',
      width: '5'
    };

    service.createBuilding(mockBuilding).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('POST');
    req.flush(mockBuilding);
  });

  it('should send a PUT request to update a building', () => {
    const mockBuilding: Buildings = {  // Use Buildings interface to define the mockBuilding
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A',
      description: 'Edificio de Engenhariaaa',
      depth: '5',
      width: '5'
    };

    service.updateBuilding(mockBuilding).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('PUT');
    req.flush(mockBuilding);
  });

  it('should send a GET request to get a building', () => {
    const mockBuilding: Buildings = {  // Use Buildings interface to define the mockBuilding
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A',
      description: 'Edificio de Engenhariaaa',
      depth: '5',
      width: '5'
    };

    service.getBuilding().subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('GET');
    req.flush(mockBuilding);
  });
  
});
