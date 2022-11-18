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
    const res = await client.query(`SELECT * FROM kitRepas.planRepas;`);
    client.release();
    return res;
  }


  public async createPlanRepas(PlanRepas:PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    if (
      !PlanRepas.numéroplan|| 
      !PlanRepas.catégorie || 
      !PlanRepas.fréquence|| 
      !PlanRepas.nbrpersonnes|| 
      !PlanRepas.nbrcalories|| 
      !PlanRepas.prix)
      {
        throw new Error("Invalid create planRepas values");
      }

    const values: (string | number)[] = 
    [
      PlanRepas.numéroplan, 
      PlanRepas.catégorie, 
      PlanRepas.fréquence, 
      PlanRepas.nbrpersonnes, 
      PlanRepas.nbrcalories, 
      PlanRepas.prix
    ];
    const queryText: string = `INSERT INTO KitRepas.PlanRepas VALUES($1, $2, $3, $4, $5, $6);`;

    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  // get plan repas that matches certain caracteristics
 /* public async filterPlanrepas(
    numéroplan:   number,
    catégorie:    string,
    fréquence:    number,
    nbrpersonnes: number,
    nbrcalories:  number,
    prix:         number
  ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const searchTerms: (string|number)[] = [];
    if (numéroplan >= 0) searchTerms.push(`numéroPlan = '${numéroplan}'`);
    if (catégorie.length > 0) searchTerms.push(`catégorie = '${catégorie}'`);
    if (fréquence >= 0) searchTerms.push(`fréquence = '${fréquence}'`);
    if (nbrpersonnes >= 0) searchTerms.push(`nbrpersonnes = '${nbrpersonnes}'`);
    if (nbrcalories >= 0) searchTerms.push(`nbrcalories = '${nbrcalories}'`);
    if (prix >= 0) searchTerms.push(`prix = '${prix}'`);

    let queryText = "SELECT * FROM KitRepas.PlanRepas";
    if (searchTerms.length > 0)
      queryText += " WHERE " + searchTerms.join(" AND ");
    queryText += ";";

    const res = await client.query(queryText);
    client.release();
    return res;
  }
*/
  // get planRepas categorie and numbers so so that the user can only select an existing hotel
  public async getPlanRepasByNos(numeroPlan:number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT *FROM KitRepas.PlanRepas WHERE numéroplan ='${numeroPlan} '`);
    client.release();
    return res;
  }

  // modify plan repas
  public async updatePlanRepas(PlanRepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues: any[] = [];

    if (PlanRepas.numéroplan >= 0) toUpdateValues.push(`numéroPlan = '${PlanRepas.numéroplan}'`);
    if (PlanRepas.catégorie.length > 0) toUpdateValues.push(`catégorie = '${PlanRepas.catégorie}'`);
    if (PlanRepas.fréquence >= 0) toUpdateValues.push(`fréquence = '${PlanRepas.fréquence}'`);
    if (PlanRepas.nbrpersonnes >= 0) toUpdateValues.push(`nbrpersonnes = '${PlanRepas.nbrpersonnes}'`);
    if (PlanRepas.nbrcalories >= 0) toUpdateValues.push(`nbrcalories = '${PlanRepas.nbrcalories}'`);
    if (PlanRepas.prix >= 0) toUpdateValues.push(`prix = '${PlanRepas.prix}'`);

    if (
      !PlanRepas.numéroplan ||
      PlanRepas.numéroplan == null||
      toUpdateValues.length === 0
    )
    {
      throw new Error("Invalid PlanRepas update query");
    }

    const query = `UPDATE KitRepas.PlanRepas SET ${toUpdateValues.join(
      ", "
    )} WHERE numéroplan = '${PlanRepas.numéroplan}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deletePlanRepas(numéroPlan: string): Promise<pg.QueryResult> {
    if (numéroPlan === null) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM kitRepas.PlanRepas WHERE numéroplan = '${numéroPlan}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }
}
