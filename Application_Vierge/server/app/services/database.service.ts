import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanRepas } from "../../../common/tables/PlanRepas";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "INF3710",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  //===========PlanRepas==========

  public async getAllPlans(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM livraisonKitRepas.PlanRepas;`);
    client.release();
    return res;
  }

  public async createPlanRepas(planRepas:PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (
      !planRepas.numeroplan.toString().length || 
      !planRepas.categorie.length || 
      !planRepas.frequence.length ||
      !planRepas.nbrcalories.toString().length || planRepas.nbrcalories < 1 ||
      !planRepas.numerofournisseur.toString().length ||
      !planRepas.prix.toString().length || planRepas.prix <= 0)
      {
        throw new Error("Invalid create planRepas values");
      }
    const queryText: string = `INSERT INTO livraisonKitRepas.PlanRepas 
    VALUES(${planRepas.numeroplan}, '${planRepas.categorie}', 
    '${planRepas.frequence}', ${planRepas.nbrpersonnes}, 
    ${planRepas.numerofournisseur}, ${planRepas.nbrcalories},  ${planRepas.prix})`;
    console.log(queryText);
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  // get planRepas by numeroPlan
  public async getPlanRepasByNos(numeroPlan:number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT *FROM livraisonKitRepas.PlanRepas WHERE numeroplan ='${numeroPlan} '`);
    client.release();
    return res;
  }

  // modify plan repas
  public async updatePlanRepas(PlanRepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let toUpdateValues: any[] = [];

    if (PlanRepas.numeroplan >= 0) toUpdateValues.push(`numeroPlan = '${PlanRepas.numeroplan}'`);
    if (PlanRepas.categorie.length > 0) toUpdateValues.push(`categorie = '${PlanRepas.categorie}'`);
    if (PlanRepas.frequence.length > 0) toUpdateValues.push(`frequence = '${PlanRepas.frequence}'`);
    if (PlanRepas.nbrpersonnes >= 0) toUpdateValues.push(`nbrPersonnes = '${PlanRepas.nbrpersonnes}'`);
    if (PlanRepas.numerofournisseur >= 0) toUpdateValues.push(`numerofournisseur = '${PlanRepas.numerofournisseur}'`);
    if (PlanRepas.nbrcalories >= 0) toUpdateValues.push(`nbrCalories = '${PlanRepas.nbrcalories}'`);
    if (PlanRepas.prix >= 0) toUpdateValues.push(`prix = '${PlanRepas.prix}'`);
    if (
      !PlanRepas.numeroplan ||
      PlanRepas.numeroplan == null||
      toUpdateValues.length === 0
    )
    {
      throw new Error("Invalid PlanRepas update query");
    }

    const query = `UPDATE livraisonKitRepas.PlanRepas SET ${toUpdateValues.join(
      ", "
    )} WHERE numeroplan = '${PlanRepas.numeroplan}';`;
    console.log(query);
    const res = await client.query(query);
    client.release();
    return res;
  }
  
  // delete plan repas
  public async deletePlanRepas(numeroPlan: number): Promise<pg.QueryResult> {
    if (numeroPlan === null) throw new Error("Invalid delete query");
    const client = await this.pool.connect();
    const query = `DELETE FROM livraisonKitRepas.PlanRepas WHERE numeroplan = '${numeroPlan}';`;
    console.log(query);
    const res = await client.query(query);
    client.release();
    return res;
  }
}
