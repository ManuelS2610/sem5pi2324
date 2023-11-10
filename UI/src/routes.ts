import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/Components/login/login.component';
import { MenuBarComponent } from './app/Components/menu-bar/menu-bar.component';

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
];

export default routeConfig;