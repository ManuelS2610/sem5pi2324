import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/Components/login/login.component';
import { MenuBarComponent } from './app/Components/menu-bar/menu-bar.component';
import { CreatePassagesComponent } from './app/Components/CreatePassages/CreatePassages.component';
import { RobotsComponent } from './app/Components/robots/robots.component';
import { RobotTypeComponent } from './app/Components/robot-type/robot-type.component';
import { BuildingsComponent } from './app/Components/buildings/buildings.component';
import { FloorsComponent } from './app/Components/floor/floor.component';
import { RoomsComponent } from './app/Components/rooms/rooms.component';
import { ElevatorsComponent } from './app/Components/elevators/elevators.component';
import { FloorStructureComponent } from './app/Components/floor-structure/floor-structure.component';


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
    component: FloorsComponent,
    title: 'Floors'
  },
  {
    path: 'Rooms',
    component: RoomsComponent,
    title: 'Rooms'
  },
  
  {
    path:'Robots',
    component: RobotsComponent,
    title: 'Robots'
  },
  {
    path: 'RobotType',
    component: RobotTypeComponent,
    title: 'RobotType'
  },
  {
    path:'Buildings',
    component:BuildingsComponent,
    title:'Buildings'
  },
  {
    path:'Elevators',
    component:ElevatorsComponent,
    title:'Elevators'
  },
  {
    path:'FloorSimulation',
    component:FloorStructureComponent,
    title:'FloorSimulation'
  }
];

export default routeConfig;