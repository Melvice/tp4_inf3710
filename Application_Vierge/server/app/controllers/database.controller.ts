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
          const plans: PlanRepas[] = result.rows.filter((plan: PlanRepas) => ({
            numeroplan: plan.numeroplan,
            categorie: plan.categorie,
            frequence: plan.frequence,
            nbrpersonnes: plan.nbrpersonnes,
            nbrcalories: plan.nbrcalories,
            prix: plan.prix,
          }));
          res.json(plans);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

  // ==== get plan repas with numeroPlan
  router.get(
    "/planrepas/numeroPlan",
    (req: Request, res: Response, _: NextFunction) => {
      let numeroPlan = parseInt(req.params.numeroplan) ? parseInt(req.params.numeroplan) : 0;
      this.databaseService
        .getPlanRepasByNos(numeroPlan)
        .then((result: pg.QueryResult) => {
          const plan = result.rows.map((planRepas: PlanRepas) => ({
            numeroplan:   planRepas.numeroplan,
            categorie:    planRepas.categorie,
            frequence:    planRepas.frequence,
            nbrpersonnes: planRepas.nbrpersonnes,
            nbrcalories:  planRepas.nbrcalories,
            numerofournisseur: planRepas.numerofournisseur,
            prix:         planRepas.prix
          }));
          res.json(plan);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    }
  );

  // ====== ADD PlanRepas ==============
  router.post(
    "/planrepas",
    (req: Request, res: Response, _: NextFunction) => {
      const planRepas: PlanRepas = {
        numeroplan:   req.body.numeroplan,
        categorie:    req.body.categorie,
        frequence:    req.body.frequence,
        nbrpersonnes: req.body.nbrpersonnes,
        nbrcalories:  req.body.nbrcalories,
        numerofournisseur: req.body.numerofournisseur,
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
    "/planrepas/:numeroplan",
    (req: Request, res: Response, _: NextFunction) => {
      const numeroPlan: number = parseInt(req.params.numeroplan);
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
    "/planrepas",
    (req: Request, res: Response, _: NextFunction) => {
      const planRepas: PlanRepas = {
        numeroplan:   req.body.numeroplan ? req.body.numeroplan : null,
        categorie:    req.body.categorie ? req.body.categorie: "",
        frequence:    req.body.frequence ? req.body.frequence: null,
        nbrpersonnes: req.body.nbrpersonnes ? req.body.nbrpersonnes: null,
        nbrcalories:  req.body.nbrcalories ? req.body.nbrcalories: null,
        numerofournisseur: req.body.numerofournisseur ? req.body.numerofournisseur: 0,
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
