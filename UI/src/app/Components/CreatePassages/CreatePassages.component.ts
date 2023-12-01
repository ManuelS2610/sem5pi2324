import { Passages } from 'src/app/interfaces/passages';
import { Component} from '@angular/core';
import { PassageService} from 'src/app/services/passage.service';
import {PASSAGES} from 'src/app/mock-passages';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-createpassages',
  templateUrl: './CreatePassages.component.html',
  styleUrls: ['./CreatePassages.component.css'],
})
export class CreatePassagesComponent {
displayedColumns: string[]= ['building1','building2','pisobuilding1','pisobuilding2'];
constructor(private passageService:PassageService) { }
data: Passages = {};
clickedRow : Passages ={};
ngOnInit(): void {
}
building1:string="";
building2:string="";
createPassage(){
  this.passageService.createPassage(this.data).subscribe();
};
updatePassage(){
  const body: Passages =
  {
    id: this.clickedRow.id,
    building1: this.clickedRow.building1,
    building2: this.clickedRow.building2,
    pisobuilding1: this.clickedRow.pisobuilding1,
    pisobuilding2: this.clickedRow.pisobuilding2
  }
  this.passageService.updatePassage(body).subscribe();
};
pa: Passages[] = [];
getPassage(){
 this.passageService.getPassage(this.building1,this.building2).subscribe(pa=> this.pa = pa);
};
openUpdateTab(clickedRow: Passages, tabGroup: MatTabGroup) {
  this.clickedRow = clickedRow; // Store the clicked row data
  tabGroup.selectedIndex = 1; // Set the index of the "Update Building" tab (0-indexed)
}
}

