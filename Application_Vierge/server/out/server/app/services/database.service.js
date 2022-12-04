"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connectionConfig = {
            user: "postgres",
            database: "TP4",
            password: "INF3710",
            port: 5432,
            host: "127.0.0.1",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    //===========PlanRepas==========
    getAllPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM livraisonKitRepas.PlanRepas;`);
            client.release();
            return res;
        });
    }
    createPlanRepas(planRepas) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            if (!planRepas.numeroplan.toString().length ||
                !planRepas.categorie.length ||
                !planRepas.frequence.length ||
                !planRepas.nbrcalories.toString().length || planRepas.nbrcalories < 1 ||
                !planRepas.numerofournisseur.toString().length ||
                !planRepas.prix.toString().length || planRepas.prix <= 0) {
                throw new Error("Invalid create planRepas values");
            }
            const queryText = `INSERT INTO livraisonKitRepas.PlanRepas 
    VALUES(${planRepas.numeroplan}, '${planRepas.categorie}', 
    '${planRepas.frequence}', ${planRepas.nbrpersonnes}, 
    ${planRepas.numerofournisseur}, ${planRepas.nbrcalories},  ${planRepas.prix})`;
            console.log(queryText);
            const res = yield client.query(queryText);
            client.release();
            return res;
        });
    }
    // get planRepas by numeroPlan
    getPlanRepasByNos(numeroPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT *FROM livraisonKitRepas.PlanRepas WHERE numeroplan ='${numeroPlan} '`);
            client.release();
            return res;
        });
    }
    // modify plan repas
    updatePlanRepas(PlanRepas) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            let toUpdateValues = [];
            if (PlanRepas.numeroplan >= 0)
                toUpdateValues.push(`numeroPlan = '${PlanRepas.numeroplan}'`);
            if (PlanRepas.categorie.length > 0)
                toUpdateValues.push(`categorie = '${PlanRepas.categorie}'`);
            if (PlanRepas.frequence.length > 0)
                toUpdateValues.push(`frequence = '${PlanRepas.frequence}'`);
            if (PlanRepas.nbrpersonnes >= 0)
                toUpdateValues.push(`nbrPersonnes = '${PlanRepas.nbrpersonnes}'`);
            if (PlanRepas.numerofournisseur >= 0)
                toUpdateValues.push(`numerofournisseur = '${PlanRepas.numerofournisseur}'`);
            if (PlanRepas.nbrcalories >= 0)
                toUpdateValues.push(`nbrCalories = '${PlanRepas.nbrcalories}'`);
            if (PlanRepas.prix >= 0)
                toUpdateValues.push(`prix = '${PlanRepas.prix}'`);
            if (!PlanRepas.numeroplan ||
                PlanRepas.numeroplan == null ||
                toUpdateValues.length === 0) {
                throw new Error("Invalid PlanRepas update query");
            }
            const query = `UPDATE livraisonKitRepas.PlanRepas SET ${toUpdateValues.join(", ")} WHERE numeroplan = '${PlanRepas.numeroplan}';`;
            console.log(query);
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
    deletePlanRepas(numeroPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numeroPlan === null)
                throw new Error("Invalid delete query");
            const client = yield this.pool.connect();
            const query = `DELETE FROM livraisonKitRepas.PlanRepas WHERE numeroplan = '${numeroPlan}';`;
            console.log(query);
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map