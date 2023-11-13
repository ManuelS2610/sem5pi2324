import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {


constructor(private userservice:UserService) { }
data: Users = {};


ngOnInit(): void {
}

createUser(){
  console.log(this.data);
  this.userservice.createUser(this.data).subscribe();
};


}
