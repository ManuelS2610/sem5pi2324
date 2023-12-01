import { Component } from '@angular/core';
import { Robots } from 'src/app/interfaces/robots';
import { RobotsService } from 'src/app/services/robots.service';
import { MatTabGroup } from '@angular/material/tabs';
import { PrologService } from 'src/app/services/prolog.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent {
  ListRobots: Robots[] = [];
  ListRobotsType: Robots[] = [];
  ListRobotsDesignation: Robots[] = [];
  data: Robots = {};
  displayedColumns: string[]= ['type','serialNumber','description','available'];
  type:string="";
  designation:string="";
  piso1:string="";
  piso2:string="";
  robotControl = new FormControl();
  selectedRobotId = "";

//clickedrow list
  clickedRow: Robots = {};
  constructor(private robotService:RobotsService, private prologService: PrologService) { }

  ngOnInit(): void {
    this.get();
  }

  createRobot(){
    console.log(this.data);
    this.robotService.createRobot(this.data).subscribe();
  };

  updateRobot(){
    const body : Robots = {
      id: this.clickedRow.id,
      type: this.clickedRow.type,
      designation: this.clickedRow.designation,
      serialNumber: this.clickedRow.serialNumber,
      description: this.clickedRow.description,
      available: this.clickedRow.available
    }
    console.log(body);
    this.robotService.updateRobot(body).subscribe();
  };

  get(){
    this.robotService.getRobot().subscribe(ListRobots=> this.ListRobots = ListRobots);
  } 
  inhibitRobot(){
   const body: Robots={
      id: this.selectedRobotId,
      available: this.data.available
   }
    this.robotService.inhibitRobot(body).subscribe();
  }

  findByTask(){
      this.robotService.findByTask(this.type).subscribe(ListRobotsType=> this.ListRobotsType = ListRobotsType);
  }

  findByDesignation(){
      this.robotService.findByDesignation(this.designation).subscribe(ListRobotsDesignation=> this.ListRobotsDesignation = ListRobotsDesignation);
  
  }
  openUpdateTab(clickedRow: Robots, tabGroup: MatTabGroup) {
    this.clickedRow = clickedRow; // Store the clicked row data
    tabGroup.selectedIndex = 1; // Set the index of the "Update Building" tab (0-indexed)
  }
  getPath(){
    this.prologService.getBestPath(this.piso1, this.piso2)
      .subscribe((result: any) => {
        alert( JSON.stringify(result));});
  }
  onRobotSelectionChange(){
    const selectedRobotName = this.robotControl.value;
      const robot = this.ListRobots.find(robot => robot.serialNumber === selectedRobotName);
      if (robot) {
        this.selectedRobotId = robot.id!;
      }
  }
}
