import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/Components/login/login.component';
import { MenuBarComponent } from './app/Components/menu-bar/menu-bar.component';
import { CreatePassagesComponent } from './app/Components/CreatePassages/CreatePassages.component';
import { LoadMapComponent } from './app/Components/load-map/load-map.component';

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
  },
  {
    path: 'menuBar',
  component: MenuBarComponent,
  title: 'Menu Bar' 
  },
  {
    path: 'Passages',
    component: CreatePassagesComponent,
    title: 'Passages'
  },
  {
    path: 'Floors',
    component: LoadMapComponent,
    title: 'Floors'
  }
];

export default routeConfig;