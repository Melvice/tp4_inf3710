import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { PlanRepasComponent } from "../planRepas/plan-repas.component";
import { AddPlanComponent } from "../add-plan/add-plan.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "planrepas", component: PlanRepasComponent },
  { path: "ajouter", component: AddPlanComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
