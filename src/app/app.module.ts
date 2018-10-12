import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MonetaryComponent } from './monetary/monetary.component';
import { MercenariesComponent } from './mercenaries/mercenaries.component';
import { TwoclickersComponent } from './twoclickers/twoclickers.component';


import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'monetary', component: MonetaryComponent },
  { path: 'mercenaries', component: MercenariesComponent },
  { path: 'twoClickers', component: TwoclickersComponent },
  { path: '**', component: HomeComponent },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    EquipmentComponent,
    MonetaryComponent,
    MercenariesComponent,
    TwoclickersComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule  // <--- import into the NgModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
