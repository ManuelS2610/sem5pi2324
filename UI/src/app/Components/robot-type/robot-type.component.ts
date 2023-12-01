import { Component } from '@angular/core';
import { RobotType } from 'src/app/interfaces/robotType';
import { RobotTypeService } from 'src/app/services/robot-type.service';
import { MatTabGroup } from '@angular/material/tabs';
@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.css']
})
export class RobotTypeComponent {
  ListRobotType: RobotType[] = [];
  data: RobotType = {};
  displayedColumns: string[]= ['name','robotDesignation'];

//clickedrow list
  clickedRow: RobotType = {};
  constructor(private robotType:RobotTypeService) { }

  ngOnInit(): void {
    this.get();
  }

  createRobotType(){
    console.log(this.data);
    this.robotType.createRobotType(this.data).subscribe();
  };

  updateRobotType(){
    const body : RobotType = {
      id: this.clickedRow.id,
      name: this.clickedRow.name,
      robotDesignation: this.clickedRow.robotDesignation
    }
    console.log(body);
    this.robotType.updateRobotType(body).subscribe();
  };

  get(){
    this.robotType.getRobotType().subscribe(ListRobotType=> this.ListRobotType = ListRobotType);
  }
  openUpdateTab(clickedRow: RobotType, tabGroup: MatTabGroup) {
    this.clickedRow = clickedRow; // Store the clicked row data
    tabGroup.selectedIndex = 1; // Set the index of the "Update Building" tab (0-indexed)
  }

}
