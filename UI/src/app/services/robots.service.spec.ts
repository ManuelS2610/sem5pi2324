import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotsService } from './robots.service';
import { Robots } from '../interfaces/robots'; // Import the Robots interface

describe('RobotsService', () => {
  let service: RobotsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotsService]
    });
    service = TestBed.inject(RobotsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robot', () => {
    const mockRobot: Robots = {  // Use Robots interface to define the mockRobot
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    service.createRobot(mockRobot).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('POST');
    req.flush(mockRobot);
  });

  it('should send a PUT request to update a robot', () => {
    const mockRobot: Robots = {  // Use Robots interface to define the mockRobot
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    service.updateRobot(mockRobot).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('PUT');
    req.flush(mockRobot);
  });

  it('should send a GET request to retrieve a robot', () => {
    const mockRobot: Robots = {  // Use Robots interface to define the mockRobot
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    service.getRobot().subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne(`http://localhost:4000/api/robots`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRobot);
  });

  it('should send a POST to create a robot', () => {
    const mockRobot: Robots = {  // Use Robots interface to define the mockRobot
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:"Survaillance",
      designation: "Teste",
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    service.createRobot(mockRobot).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('POST');
    req.flush(mockRobot);
  }
  );

  it('should send a GET request to get a robot by designation', () => {
    const mockRobot: Robots = {  // Use Elevators interface to define the mockElevator
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:'Survaillance',
      designation: 'Teste',
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };
    service.findByDesignation('Teste').subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    }
  
    );
    const req = httpTestingController.expectOne('http://localhost:4000/api/robots/Teste');
    expect(req.request.method).toBe('GET');
    req.flush(mockRobot);
  });


  it('should send a GET request to get a robot by type', () => {
    const mockRobot: Robots = {  // Use Elevators interface to define the mockElevator
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      type:'Survaillance',
      designation: 'Teste',
      serialNumber: 'SDSA232S244SDZ3',
      description: 'Teste',
      available: true
    };

    service.findByTask('Survaillance').subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });
    

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots/Survaillance');
    expect(req.request.method).toBe('GET');
    req.flush(mockRobot);
  });


 
});