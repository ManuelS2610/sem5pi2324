import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';

const routeConfig: Routes = [
  {
  path: '',
  component: HomeComponent,
  title: 'Home page'
  },
  { 
  path: 'signup',
  component: SignUpComponent,
  title: 'Sign-Up' 
  }
];

export default routeConfig;