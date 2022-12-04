import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete-plan.component.html',
  styleUrls: ['./delete-plan.component.css']
})
export class DeletePlanComponent implements OnInit {

  newPlan :PlanRepas

  constructor(@Inject(MAT_DIALOG_DATA) public data: { planRepas: PlanRepas }, private communicationService: CommunicationService, public router: Router ) {
  }

 ngOnInit(): void {
   this.newPlan = this.data.planRepas;
    console.log(this.newPlan);
 }
 public reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
public  deletePlanRepas() : void {
  this.communicationService.deletePlanRepas(this.newPlan.numeroplan).subscribe(() => {
    this.reloadCurrentRoute();
 })
}

}
