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
displayedColumns: string[]= ['id','building1','building2','pisobuilding1','pisobuilding2'];
constructor(private passageService:PassageService) { }
data: Passages = {};
ngOnInit(): void {
}
building1:string="";
building2:string="";
createPassage(){
  this.passageService.createPassage(this.data).subscribe();
};
updatePassage(){
  this.passageService.updatePassage(this.data).subscribe();
};
pa: Passages[] = [];
getPassage(){
 this.passageService.getPassage(this.building1,this.building2).subscribe(pa=> this.pa = pa);
};
}

