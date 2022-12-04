import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanRepasComponent } from './planRepas/plan-repas.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { ModifyPlanComponent } from './modify-plan/modify-plan.component';
import { DeletePlanComponent } from './delete-plan/delete-plan.component';
import { messageDialogComponent } from "./message-dialog/message-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    PlanRepasComponent,
    AddPlanComponent,
    ModifyPlanComponent,
    DeletePlanComponent,
    messageDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
