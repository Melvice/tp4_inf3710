import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-modify-plan',
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.css']
})
export class ModifyPlanComponent implements OnInit {
  secondFormGroup: FormGroup
  newPlan:PlanRepas;

  public duplicateError: boolean = false;
  categories: string[] = ['Pescétarien', 'Famille','Végétarien'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { planRepas: PlanRepas }, public communicationService: CommunicationService ) {
   }

  ngOnInit(): void {
    this.newPlan = this.data.planRepas;
    console.log(this.newPlan);
  }
  updatePlanRepas(){
    this.communicationService.updatePlanRepas(this.newPlan).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.duplicateError = res === -1;
    });
  }
}
