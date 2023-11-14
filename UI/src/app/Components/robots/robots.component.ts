import { Component } from '@angular/core';
import { Robots } from 'src/app/interfaces/robots';
import { RobotsService } from 'src/app/services/robots.service';

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
  displayedColumns: string[]= ['id','type','serialNumber','description','available'];
  type:string="";
  designation:string="";
  constructor(private robotService:RobotsService) { }

  ngOnInit(): void {
    this.get();
  }

  createRobot(){
    console.log(this.data);
    this.robotService.createRobot(this.data).subscribe();
  };

  updateRobot(){
    this.robotService.updateRobot(this.data).subscribe();
  };

  get(){
    this.robotService.getRobot().subscribe(ListRobots=> this.ListRobots = ListRobots);
  } 
  inhibitRobot(){
    this.robotService.inhibitRobot(this.data).subscribe();
  }

  findByTask(){
      this.robotService.findByTask(this.type).subscribe(ListRobotsType=> this.ListRobotsType = ListRobotsType);
  }

  findByDesignation(){
      this.robotService.findByDesignation(this.designation).subscribe(ListRobotsDesignation=> this.ListRobotsDesignation = ListRobotsDesignation);
  
  }

}
