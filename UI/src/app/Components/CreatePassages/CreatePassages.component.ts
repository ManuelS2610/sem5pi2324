import { Passages } from 'src/app/interfaces/passages';
import { Component} from '@angular/core';
import { PassageService} from 'src/app/services/passage.service';
import {PASSAGES} from 'src/app/mock-passages';


@Component({
  selector: 'app-createpassages',
  templateUrl: './CreatePassages.component.html',
  styleUrls: ['./CreatePassages.component.css'],
})
export class CreatePassagesComponent {
   passages:Passages[] =[{
    id:"A1243",
    building1: "A",
    building2: "B",
    pisobuilding1: "A1",
    pisobuilding2: "A2",
    positionBuilding1: [],
    positionBuilding2: [],
  },
  {
  id:"A1243",
    building1: "A",
    building2: "B",
    pisobuilding1: "A1",
    pisobuilding2: "A2",
    positionBuilding1: [],
    positionBuilding2: [],
  },
];
displayedColumns: string[]= ['id','building1','building2','pisobuilding1','pisobuilding2'];
constructor(private passageService:PassageService) { }
data: Passages = {};
passage = PASSAGES;
ngOnInit(): void {
  this.get();
}
building1:string="";
building2:string="";
createPassage(){
  this.passageService.createPassage(this.data);
};
updatePassage(){
  this.passageService.updatePassage(this.data);
};
getPassage(){
 this.passageService.getPassage(this.building1,this.building2);
};
pa: Passages[] = [];
get(){
  this.passageService.get().subscribe(pa=> this.pa = pa);
} 
}

