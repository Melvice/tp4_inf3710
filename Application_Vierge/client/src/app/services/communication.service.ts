// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of,Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

import { PlanRepas } from "../../../../common/tables/PlanRepas";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  //======== Plan Repas http request =================
  public getPlanRepas(): Observable<PlanRepas[]> {
    return this.http
      .get<PlanRepas[]>(this.BASE_URL + "/planrepas")
      .pipe(catchError(this.handleError<PlanRepas[]>("getPlanRepas")));
  }

  public AddPlanRepas(planRepas: PlanRepas): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/ajouter", planRepas)
      .pipe(catchError(this.handleError<number>("AddPlanRepas")));
  }

  public updatePlanRepas(planRepas: PlanRepas): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/planrepas/update", planRepas)
      .pipe(catchError(this.handleError<number>("updatePlanRepas")));
  }

  public deletePlanRepas(numeroPlan: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/delete/" + numeroPlan, {})
      .pipe(catchError(this.handleError<number>("deletePlanRepas")));
  }

  public getPlanRepasByNumber(): Observable<PlanRepas[]> {
    return this.http
      .get<PlanRepas[]>(this.BASE_URL + "/planrepas/numeroPlan")
      .pipe(catchError(this.handleError<PlanRepas[]>("getPlanRepasByNumber")));
  }


  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
   private handleError<T>(
     request: string,
     result?: T
     ): (error: Error) => Observable<T> {
     return (error: Error): Observable<T> => {
       return of(result as T);
     };
  }
}
