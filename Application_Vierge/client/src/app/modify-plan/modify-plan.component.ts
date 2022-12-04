import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import { CommunicationService } from '../services/communication.service';
import { FormGroup } from '@angular/forms';
import { messageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modify-plan',
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.css']
})
export class ModifyPlanComponent implements OnInit {
  secondFormGroup : FormGroup
  newPlan : PlanRepas;
  planRepas: PlanRepas[];
  categories: string[] = ['Pescétarien', 'Famille','Végétarien'];
  frequence:string[] = ['Quotidien', 'Hebdomadaire','Mensuel'];
  /**
  * Note : ICI on set les valeurs par defauts des fournisseurs
   parce qu'en soit, le tp ne nous oblige pas à implémenter une table pour les fournisseurs
   pour ainsi récupérer les numéros des fournisseurs
  */
   fournisseurs:number[] = [ 65165, 68454, 16456 ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { planRepas: PlanRepas }, 
  public communicationService: CommunicationService, public dialog: MatDialog, private router: Router ) {
   }

  ngOnInit(): void {
    this.newPlan = this.data.planRepas;
  }
  
  public displaySuccess(msg: string,  type: string) {
    this.dialog.open(messageDialogComponent, {
      data: [msg,type],
      minWidth: '250px',
    });
  }

  public displayError(msg: string, type: string) {
    this.dialog.open(messageDialogComponent, {
      data: [msg,type],
      minWidth: '250px',
    });
  }

  public validatePrix() : boolean{
    if(this.newPlan.prix <= 0.0 || isNaN(this.newPlan.prix)){
      this.displayError("Le prix ne peut pas être inférieur ou égal à 0 ,ni vide et doit être un nombre", "error");
      return false;;
    }
    return true;
  }

  public validateNombreCalories() : boolean{
    if(this.newPlan.nbrcalories <= 0 || isNaN(this.newPlan.nbrcalories)){
      this.displayError("Le nombre de calories ne peut pas être inférieur ou égal à 0 ,ni vide et doit être un nombre ", "error");
      return false;
    }
    return true;
  }

  public validateNombrePersonnes() : boolean{
    if(this.newPlan.nbrpersonnes <= 0 || isNaN(this.newPlan.nbrpersonnes)){
      this.displayError("Le nombre de personnes ne peut pas être inférieur ou égal à 0, ni vide et doit etre un entier", "error");
      return false;
    }
    return true;
  }

  public valideInput():boolean{
    if(
     this.validatePrix() && 
     this.validateNombreCalories() && 
     this.validateNombrePersonnes()){
      return true;
    } 
    return false;
  }
      
  public reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  public updatePlanRepas(): void{
    if(this.valideInput()){
    this.communicationService.updatePlanRepas(this.newPlan).subscribe((res: number) =>
      {
        if (res < 0) this.displayError("La modification du plan a échouée, il est possible qu'une des valeurs entrées soit invalides", "error");
        else {
          this.displaySuccess("Votre plan repas a été modifié avec succès !", "success");
          this.reloadCurrentRoute();
          setTimeout(() => {
           this.dialog.closeAll();
          }, 2000);
        }    
      });
  
  }
}
}
