import { Routes } from '@angular/router';
import { SignUpComponent } from './app/Components/sign-up/sign-up.component';

const routeConfig: Routes = [
  { path: 'signup',
   component: SignUpComponent,
  title: 'Sign Up' }
];

export default routeConfig;