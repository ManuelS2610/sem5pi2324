import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotTypeService } from './robot-type.service';
import { RobotType } from '../interfaces/robotType'; // Import the RobotType interface

describe('RobotTypeService', () => {
  let service: RobotTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotTypeService]
    });
    service = TestBed.inject(RobotTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robotType', () => {
    const mockRobotType: RobotType = {  // Use RobotType interface to define the mockRobotType
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    };

    service.createRobotType(mockRobotType).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');
    expect(req.request.method).toBe('POST');
    req.flush(mockRobotType);
  });

  it('should send a PUT request to update a robotType', () => {
    const mockRobotType: RobotType = {  // Use RobotType interface to define the mockRobotType
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'Pick-Up&Delivery',
      robotDesignation: 'Robot',
    };

    service.updateRobotType(mockRobotType).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');
    expect(req.request.method).toBe('PUT');
    req.flush(mockRobotType);
  });

  it('Should send a GET request to retrieve all robotTypes', () => {
    const mockRobotTypes: RobotType[] = [
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        name: 'Pick-Up&Delivery',
        robotDesignation: 'Robot',
      },
      {
        id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
        name: 'Survaillance',
        robotDesignation: 'Robot',
      }
    ];

    service.getRobotType().subscribe(response => {
      expect(response).toEqual(mockRobotTypes);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');
    expect(req.request.method).toBe('GET');
    req.flush(mockRobotTypes);
  }
  );


});
