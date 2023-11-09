import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/Components/login/login.component';

const routeConfig: Routes = [
  {
  path: '',
  component: HomeComponent,
  title: 'Home page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  { 
  path: 'signup',
  component: SignUpComponent,
  title: 'Sign-Up' 
  }
];

export default routeConfig;