import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PassageService } from './passage.service';
import { Passages } from '../interfaces/passages'; // Import the Passages interface

describe('PassageService', () => {
    let service: PassageService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PassageService]
        });
        service = TestBed.inject(PassageService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to create a passage', () => {
        const mockPassage: Passages = {  // Use Passages interface to define the mockPassage
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        };

        service.createPassage(mockPassage).subscribe(response => {
            expect(response).toBeTruthy(); // You can add specific checks based on your API response
        });

        const req = httpTestingController.expectOne('http://localhost:4000/api/passage');
        expect(req.request.method).toBe('POST');
        req.flush(mockPassage);
    });

    it('should send a PUT request to update a passage', () => {
        const mockPassage: Passages = {  // Use Passages interface to define the mockPassage
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        };

        service.updatePassage(mockPassage).subscribe(response => {
            expect(response).toBeTruthy(); // You can add specific checks based on your API response
        });

        const req = httpTestingController.expectOne('http://localhost:4000/api/passage');
        expect(req.request.method).toBe('PUT');
        req.flush(mockPassage);
    });

    it('should send a GET request to get a passage', () => {
        const mockPassage: Passages = {  // Use Passages interface to define the mockPassage
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        };

        service.getPassage(mockPassage.building1, mockPassage.building2).subscribe(response => {
            expect(response).toBeTruthy(); // You can add specific checks based on your API response
        });

        const req = httpTestingController.expectOne('http://localhost:4000/api/passage/A/B');
        expect(req.request.method).toBe('GET');
        req.flush(mockPassage);
    });
});