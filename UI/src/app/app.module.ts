import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { provideRouter } from '@angular/router';
import routeConfig from 'src/routes';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './module/materials/materials.module';
import { MenuBarComponent } from './Components/menu-bar/menu-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePassagesComponent } from './Components/CreatePassages/CreatePassages.component';
import { RobotsComponent } from './Components/robots/robots.component';
import { RobotTypeComponent } from './Components/robot-type/robot-type.component';
import { BuildingsComponent } from './Components/buildings/buildings.component';
import { LoadMapComponent } from './Components/load-map/load-map.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    MenuBarComponent,
    CreatePassagesComponent,
    RobotsComponent,
    RobotTypeComponent,
    BuildingsComponent,
    LoadMapComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideRouter(routeConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
