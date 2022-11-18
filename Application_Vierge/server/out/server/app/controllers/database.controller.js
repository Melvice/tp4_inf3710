"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const database_service_1 = require("../services/database.service");
let DatabaseController = class DatabaseController {
    constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        // ======= Plan Repas ROUTES =======
        router.get("/planrepas", (req, res, _) => {
            this.databaseService
                .getAllPlans()
                .then((result) => {
                const planRepas = result.rows.map((plan) => ({
                    numéroplan: plan.numéroplan,
                    catégorie: plan.catégorie,
                    fréquence: plan.fréquence,
                    nbrpersonnes: plan.nbrpersonnes,
                    nbrcalories: plan.nbrcalories,
                    prix: plan.prix,
                }));
                res.json(planRepas);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        // ==== get plan repas with numeroPlan
        router.get("/planrepas/numeroPlan", (req, res, _) => {
            let numeroPlan = parseInt(req.params.numéroplan) ? parseInt(req.params.numéroplan) : 0;
            this.databaseService
                .getPlanRepasByNos(numeroPlan)
                .then((result) => {
                const planRepasNames = result.rows.map((planRepas) => ({
                    numéroplan: planRepas.numéroplan,
                    catégorie: planRepas.catégorie,
                    fréquence: planRepas.fréquence,
                    nbrpersonnes: planRepas.nbrpersonnes,
                    nbrcalories: planRepas.nbrcalories,
                    prix: planRepas.prix
                }));
                res.json(planRepasNames);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        // ====== ADD PlanRepas ==============
        router.post("/planrepas/ajouter", (req, res, _) => {
            const planRepas = {
                numéroplan: req.body.numéroplan,
                catégorie: req.body.catégorie,
                fréquence: req.body.fréquence,
                nbrpersonnes: req.body.nbrpersonnes,
                nbrcalories: req.body.nbrcalories,
                prix: req.body.prix
            };
            this.databaseService
                .createPlanRepas(planRepas)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.json(-1);
            });
        });
        //====== delete a plan from the database
        router.delete("/planrepas/delete/:numéroplan", (req, res, _) => {
            const numeroPlan = req.params.numéroplan;
            this.databaseService
                .deletePlanRepas(numeroPlan)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        //=== update planRepas =======
        router.put("/planrepas/update", (req, res, _) => {
            const planRepas = {
                numéroplan: req.body.numéroplan ? req.body.numéroplan : null,
                catégorie: req.body.catégorie ? req.body.catégorie : "",
                fréquence: req.body.fréquence ? req.body.fréquence : null,
                nbrpersonnes: req.body.nbrpersonnes ? req.body.nbrpersonnes : null,
                nbrcalories: req.body.nbrcalories ? req.body.nbrcalories : null,
                prix: req.body.prix ? req.body.prix : null
            };
            this.databaseService
                .updatePlanRepas(planRepas)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        return router;
    }
};
DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map