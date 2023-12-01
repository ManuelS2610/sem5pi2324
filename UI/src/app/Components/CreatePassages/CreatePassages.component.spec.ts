import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { CreatePassagesComponent } from './CreatePassages.component';
import { PassageService } from 'src/app/services/passage.service';
import { of } from 'rxjs';
import { Passages } from 'src/app/interfaces/passages';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';

describe('CreatePassagesComponent', () => {
    let component: CreatePassagesComponent;
    let fixture: ComponentFixture<CreatePassagesComponent>;
    let passageService: PassageService;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            declarations: [CreatePassagesComponent],
            imports: [MatTabsModule,HttpClientTestingModule],
            providers: [PassageService]
        });
        fixture = TestBed.createComponent(CreatePassagesComponent);
        component = fixture.componentInstance;
        passageService = TestBed.inject(PassageService);
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call createPassage method with correct data', () => {
        const newPassage: Passages = {
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        };

        spyOn(passageService, 'createPassage').and.returnValue(of(newPassage));
        component.data = newPassage;
        component.createPassage();
        expect(passageService.createPassage).toHaveBeenCalledWith(newPassage);
    });

    it('should call updatePassage method with correct data', () => {
        const updatedPassage: Passages = {
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        };

        spyOn(passageService, 'updatePassage').and.returnValue(of(updatedPassage));
        component.clickedRow = updatedPassage;
        component.updatePassage();
        expect(passageService.updatePassage).toHaveBeenCalledWith(updatedPassage);
    });

    it('should call getPassage method with correct data', () => {
        const getPassage: Passages[] = [{
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B1',
        },{
            id: '69f0d29f-2361-41e4-9114-1f5c2bfa08aa',
            building1: 'B',
            building2: 'D',
            pisobuilding1: 'B1',
            pisobuilding2: 'D1',
        }];

        spyOn(passageService, 'getPassage').and.returnValue(of(getPassage));
        component.getPassage();
        expect(passageService.getPassage).toHaveBeenCalled();
    });

});
