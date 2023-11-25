import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MedecinComponent } from "../medecin/medecin.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: 'medecin', component: MedecinComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
