import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete-plan.component.html',
  styleUrls: ['./delete-plan.component.css']
})
export class DeletePlanComponent implements OnInit {

  newPlan :PlanRepas

  constructor(@Inject(MAT_DIALOG_DATA) public data: { planRepas: PlanRepas }, private communicationService: CommunicationService ) {
  }

 ngOnInit(): void {
   this.newPlan = this.data.planRepas;
    console.log(this.newPlan);
 }

 deletePlanRepas() : void {
  this.communicationService.deletePlanRepas(this.newPlan.numeroplan).subscribe(() => {
    window.location.reload();
 })
}

}