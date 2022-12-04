import { Component, OnInit } from '@angular/core';
import { PlanRepas } from '../../../../common/tables/PlanRepas';
import {CommunicationService} from '../services/communication.service'
import { FormGroup } from '@angular/forms';
import { messageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  firstFormGroup: FormGroup;
  numeroPlan = 0;
  categoriePlan = "";
  prixPlan = 0.0;
  nombreCalories = 0;
  nombrePersonnes = 0;
  frequencePlan = "";
  numerofournisseur = 0;
  categories: string[] = ['Pescétarien', 'Famille',
  'Végétarien'];


  /**
  * Note : ICI on set les valeurs par defauts des fournisseurs
   parce qu'en soit, le tp ne nous oblige pas à implémenter une table pour les fournisseurs
   pour ainsi récupérer les numéros des fournisseurs
  */
  
  fournisseurs:number[] = [
    65165,
    68454,
    16456
  ]
  public duplicateError: boolean = false;
  planRepas: PlanRepas[];

  constructor(public dialog:MatDialog, private communicationService : CommunicationService) { }

  ngOnInit(): void {
    this.getAllPlanRepas();
  }

  public getAllPlanRepas(): void {
    this.communicationService.getAllPlanRepas().subscribe((planRepas: PlanRepas[]) => {
      this.planRepas = planRepas ? planRepas : [];
      this.planRepas = planRepas.sort((plan1, plan2)=>{
        return plan1.numeroplan - plan2.numeroplan;
      });
    });
  }

  public displaySuccess(msg: string,  type: string) {
    this.dialog.open(messageDialogComponent, {
      data: [msg,type],
      minWidth: '250px',
      panelClass: 'success'
    });
  }
  public displayError(msg: string, type: string) {
    this.dialog.open(messageDialogComponent, {
      data: [msg,type],
      minWidth: '250px',
      panelClass: 'error'
    });
  }

  public validateNumero() : boolean{
    if(this.numeroPlan == 0){
      this.displayError("Le numéro du plan ne peut pas être 0", "error");
      return false;
    }else{
      let plan = this.planRepas.find(plan => plan.numeroplan == this.numeroPlan);
      if(plan){
        this.displayError("Le numéro du plan existe déjà", "error");
        return false;
      }
    }
    return true;
  }

  public validateCategorie() : boolean{
    if(this.categoriePlan == ""){
      this.displayError("La catégorie du plan ne peut pas être vide", "error");
      return false;
    }
    return true;
  }

  public validateFrequence() : boolean{
    if(this.frequencePlan == ""){
      this.displayError("La fréquence du plan ne peut pas être vide", "error");
      return false;
    }
    return true;
  }

  public validateNumeroFournisseur() : boolean{
    if(this.numerofournisseur == 0){
      this.displayError("Le numéro du fournisseur ne peut pas être vide", "error");
      return false;
    }
    return true;
  }

  public validatePrix() : boolean{
    if(this.prixPlan == 0.0 || isNaN(this.prixPlan)){
      this.displayError("vérifier que le prix est un nombre et qu'il ne soit pas 0", "error");
      return false;;
    }
    return true;
  }

  public validateNombreCalories() : boolean{
    if(this.nombreCalories == 0|| isNaN(this.nombreCalories)){
      this.displayError("Le nombre de calories ne peut pas être 0 et doit être un nombre ", "error");
      return false;
    }
    return true;
  }

  public validateNombrePersonnes() : boolean{
    if(this.nombrePersonnes == 0 || isNaN(this.nombreCalories)){
      this.displayError("Le nombre de personnes ne peut pas être 0 et doit etre un entier", "error");
      return false;
    }
    return true;
  }

  public valideInput():boolean{
    if(this.validateNumero() && 
     this.validateFrequence() &&
     this.validateCategorie() &&
     this.validateNumeroFournisseur() &&
     this.validatePrix() && 
     this.validateNombreCalories() && 
     this.validateNombrePersonnes()){
      return true;
    } 
    return false;
  }
      
  public addPlanRepas(): void {
    if(this.valideInput()){
    const plan: PlanRepas = {
      numeroplan:    +this.numeroPlan,
      categorie:     this.categoriePlan,
      frequence:     this.frequencePlan,
      nbrpersonnes:  +this.nombrePersonnes,
      nbrcalories:   +this.nombreCalories,
      numerofournisseur:  +this.numerofournisseur,
      prix:          +this.prixPlan  
    };
    this.communicationService.addPlanRepas(plan).subscribe((res: number)=> 
      {
        if (res < 0) this.displayError("L'ajout du plan a échouée, il est possible qu'une des valeurs entrées soit invalides", "error");
        else this.displaySuccess("Votre plan repas a été ajouté avec succès !", "success");
      });
  }
}
}

