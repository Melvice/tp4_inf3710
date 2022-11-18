import { Component } from '@angular/core';
import {CommunicationService} from '../services/communication.service'
import { PlanRepas } from '../../../../common/tables/PlanRepas';
@Component({
  selector: 'app-plan-repas',
  templateUrl: './plan-repas.component.html',
  styleUrls: ['./plan-repas.component.css']
})
export class PlanRepasComponent {

  public constructor(private communicationService: CommunicationService) {}

  public planRepas : PlanRepas[] = [];

  public ngOnInit(): void {
    this.getAllPlanRepas();
  }
  
  public getAllPlanRepas(): void {
    this.communicationService.getAllPlanRepas().subscribe((planRepas: PlanRepas[]) => {
      this.planRepas = planRepas;
    });
  }

 /* public insertHotel(): void {
    const hotel: any = {
      hotelnb: this.newHotelNb.nativeElement.innerText,
      name: this.newHotelName.nativeElement.innerText,
      city: this.newHotelCity.nativeElement.innerText,
    };

    this.communicationService.insertHotel(hotel).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.refresh();
      this.duplicateError = res === -1;
    });
  }*/

 /* private refresh() {
    this.getAllPlanRepas();
    this.newHotelNb.nativeElement.innerText = "";
    this.newHotelName.nativeElement.innerText = "";
    this.newHotelCity.nativeElement.innerText = "";
  }*/

  public deleteHotel(numeroPlan: number) {
    this.communicationService.deletePlanRepas(numeroPlan).subscribe((res: any) => {
    //  this.refresh();
    });
  }
/*
  public changeHotelName(event: any, i:number){
    //const editField = event.target.textContent;
    //this.hotels[i].name = editField;
  }

  public changeHotelCity(event: any, i:number){
   /* const editField = event.target.textContent;
    this.hotels[i].city = editField;
  }*/

  public updatePlanRepas(numeroPlan: number) {
   this.communicationService.updatePlanRepas(this.planRepas[numeroPlan]).subscribe((res: any) => {
     // this.refresh();
    });
  }

}
