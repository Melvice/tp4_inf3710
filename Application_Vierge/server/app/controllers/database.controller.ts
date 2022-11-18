import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import Types from "../types";
import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import { PlanRepas } from "../../../common/tables/PlanRepas";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}


  public get router(): Router {
    const router: Router = Router();

   // ======= Plan Repas ROUTES =======

  router.get("/planrepas", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getAllPlans()
        .then((result: pg.QueryResult) => {
          const planRepas: PlanRepas[] = result.rows.map((plan: PlanRepas) => ({
            numéroplan: plan.numéroplan,
            catégorie: plan.catégorie,
            fréquence: plan.fréquence,
            nbrpersonnes: plan.nbrpersonnes,
            nbrcalories: plan.nbrcalories,
            prix: plan.prix,
          } as PlanRepas));
          res.json(planRepas);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

  // ==== get plan repas with numeroPlan

  router.get(
    "/planrepas/numeroPlan",
    (req: Request, res: Response, _: NextFunction) => {
      let numeroPlan = parseInt(req.params.numéroplan) ? parseInt(req.params.numéroplan) : 0;
      this.databaseService
        .getPlanRepasByNos(numeroPlan)
        .then((result: pg.QueryResult) => {
          const planRepasNames = result.rows.map((planRepas: PlanRepas) => ({
            numéroplan:   planRepas.numéroplan,
            catégorie:    planRepas.catégorie,
            fréquence:    planRepas.fréquence,
            nbrpersonnes: planRepas.nbrpersonnes,
            nbrcalories:  planRepas.nbrcalories,
            prix:         planRepas.prix
          }));
          res.json(planRepasNames);
        })

        .catch((e: Error) => {
          console.error(e.stack);
        });
    }
  );

  // ====== ADD PlanRepas ==============

  
  router.post(
    "/planrepas/ajouter",
    (req: Request, res: Response, _: NextFunction) => {
      const planRepas: PlanRepas = {
        numéroplan:   req.body.numéroplan,
        catégorie:    req.body.catégorie,
        fréquence:    req.body.fréquence,
        nbrpersonnes: req.body.nbrpersonnes,
        nbrcalories:  req.body.nbrcalories,
        prix:         req.body.prix
      };

      this.databaseService
        .createPlanRepas(planRepas)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
    }
  );

 //====== delete a plan from the database

  router.delete(
    "/planrepas/delete/:numéroplan",
    (req: Request, res: Response, _: NextFunction) => {
      const numeroPlan: string = req.params.numéroplan;
      this.databaseService
        .deletePlanRepas(numeroPlan)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    }
  );

  //=== update planRepas =======
  router.put(
    "/planrepas/update",
    (req: Request, res: Response, _: NextFunction) => {
      const planRepas: PlanRepas = {
       
        numéroplan:   req.body.numéroplan ? req.body.numéroplan : null,
        catégorie:    req.body.catégorie ? req.body.catégorie: "",
        fréquence:    req.body.fréquence ? req.body.fréquence: null,
        nbrpersonnes: req.body.nbrpersonnes ? req.body.nbrpersonnes: null,
        nbrcalories:  req.body.nbrcalories ? req.body.nbrcalories: null,
        prix:         req.body.prix ? req.body.prix : null
      };

      this.databaseService
        .updatePlanRepas(planRepas)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      });
    return router;
  }
}
