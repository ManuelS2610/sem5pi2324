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
  data: Robots = {};
  displayedColumns: string[]= ['id','type','serialNumber','description','available'];
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

}
