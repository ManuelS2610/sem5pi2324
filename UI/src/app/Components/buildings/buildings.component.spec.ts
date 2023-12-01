import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { BuildingsComponent } from './buildings.component';
import { BuildingService } from 'src/app/services/building.service';
import { of } from 'rxjs';
import { Buildings } from 'src/app/interfaces/buildings';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
describe('BuildingsComponent', () => {
  let component: BuildingsComponent;
  let fixture: ComponentFixture<BuildingsComponent>;
  let buildingService: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingsComponent],
      imports: [MatTabsModule,HttpClientTestingModule], // Import necessary modules (like MatTabsModule)
      providers: [BuildingService] // Provide mock or actual service here
    });
    fixture = TestBed.createComponent(BuildingsComponent);
    component = fixture.componentInstance;
    buildingService = TestBed.inject(BuildingService); // Get reference to the service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createBuilding method with correct data', () => {
    const newBuilding: Buildings = {
      name: 'A',
      description: 'Description of the new building',
      depth: '10',
      width: '10'
    };

    spyOn(buildingService, 'createBuilding').and.returnValue(of(newBuilding));

    component.data = newBuilding; // Set component data to the new building

    component.createBuilding();

    expect(buildingService.createBuilding).toHaveBeenCalledWith(newBuilding);
  });

  it('should call updateBuilding method with correct data', () => {
    const updatedBuilding: Buildings = {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A',
      description: 'Description of the new building',
      depth: '10',
      width: '10'
    };

    spyOn(buildingService, 'updateBuilding').and.returnValue(of(updatedBuilding));


    component.clickedRow = updatedBuilding; // Set component clickedRow to the updated building


    component.updateBuilding();
  

    expect(buildingService.updateBuilding).toHaveBeenCalledWith(updatedBuilding);
  }
  );

  it('should call getBuilding method', () => {
    const buildings: Buildings[] = [{
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'A',
      description: 'Description of the new building',
      depth: '10',
      width: '10'
    },
    {
      id: '69f0d29f-2361-41e4-9114-1f5c2bfa08ae',
      name: 'B',
      description: 'Description of the neqqw building',
      depth: '10',
      width: '10'
    },];

    spyOn(buildingService, 'getBuilding').and.returnValue(of(buildings));

    component.get();

    expect(buildingService.getBuilding).toHaveBeenCalled();
  });
});

