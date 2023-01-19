import { Component} from '@angular/core';
import {CommunicationService} from '../services/communication.service'
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { MatDialog} from '@angular/material/dialog';
import { ModifyPlanComponent } from '../modify-plan/modify-plan.component';
import { DeletePlanComponent } from '../delete-plan/delete-plan.component';
@Component({
  selector: 'app-plan-repas',
  templateUrl: './plan-repas.component.html',
  styleUrls: ['./plan-repas.component.css']
})
export class PlanRepasComponent {
  public duplicateError: boolean = false;
  
  public constructor(public dialog:MatDialog, private communicationService: CommunicationService) {}

  public planRepas : PlanRepas[] = [];

  public ngOnInit(): void {
    this.getAllPlanRepas();
  }
  public test(): void{

  }

  public getAllPlanRepas(): void {
    this.communicationService.getAllPlanRepas().subscribe((planRepas: PlanRepas[]) => {
      this.planRepas = planRepas ? planRepas : [];
      this.planRepas = planRepas.sort((plan1, plan2)=>{
        return plan1.numeroplan - plan2.numeroplan;
      });
    });
  }

  UpdateDialog(planRepas: PlanRepas) {
    this.dialog.open(ModifyPlanComponent, {data:{planRepas: planRepas}});
  }
  deleteDialog(planRepas: PlanRepas) {
    this.dialog.open(DeletePlanComponent, {data:{planRepas: planRepas}});
  }
}

