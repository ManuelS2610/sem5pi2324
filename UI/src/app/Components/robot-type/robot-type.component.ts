import { Component } from '@angular/core';
import { RobotType } from 'src/app/interfaces/robotType';
import { RobotTypeService } from 'src/app/services/robot-type.service';

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.css']
})
export class RobotTypeComponent {
  ListRobotType: RobotType[] = [];
  data: RobotType = {};
  displayedColumns: string[]= ['id','name','robotDesignation'];

  constructor(private robotType:RobotTypeService) { }

  ngOnInit(): void {
    this.get();
  }

  createRobotType(){
    console.log(this.data);
    this.robotType.createRobotType(this.data).subscribe();
  };

  updateRobotType(){
    this.robotType.updateRobotType(this.data).subscribe();
  };

  get(){
    this.robotType.getRobotType().subscribe(ListRobotType=> this.ListRobotType = ListRobotType);
  }

}
