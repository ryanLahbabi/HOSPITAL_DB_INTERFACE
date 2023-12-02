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
            database: "hopital_bd",
            password: "0604371187",
            port: 5432,
            host: "localhost",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    getAllMedecins() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("requetes");
            const client = yield this.pool.connect();
            const res = yield client.query('SELECT * FROM Medecins ORDER BY idMedecin ASC;');
            console.log(res);
            const medecins = res.rows.map(row => ({
                idmedecin: row.idmedecin.toString(),
                prenom: row.prenom,
                nom: row.nom,
                specialite: row.specialite,
                annesexperiences: row.anneesexperience,
                idservice: row.idservice.toString() // Conversion en string si nécessaire
            }));
            client.release();
            return medecins;
        });
    }
    deleteMedecin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" id delete" + id);
            const client = yield this.pool.connect();
            const res = yield client.query('DELETE FROM Medecins WHERE idmedecin = $1;', [id]);
            console.log(res);
            client.release();
        });
    }
    addMedecin(medecin) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("medecin add dans db service add medecine : " + medecin.annesexperiences + 'medecin annes' + medecin.idservice + 'medecin idservice' + medecin.idmedecin + 'medecin idmedecin');
            const client = yield this.pool.connect();
            const resId = yield client.query('SELECT idmedecin FROM Medecins ORDER BY idmedecin DESC LIMIT 1');
            const lastId = resId.rows[0].idmedecin;
            medecin.idmedecin = (parseInt(lastId) + 1).toString();
            const res = yield client.query('INSERT INTO Medecins (idmedecin, prenom, nom, specialite, anneesexperience, idservice) VALUES ($1, $2, $3, $4, $5, $6);', [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice]);
            console.log(res);
            client.release();
        });
    }
    updateMedecin(medecin) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("medecin : " + medecin);
            const client = yield this.pool.connect();
            const res = yield client.query('UPDATE Medecins SET prenom = $1, nom = $2, specialite = $3, anneesexperience = $4, idservice = $5 WHERE idmedecin = $6;', [medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice, medecin.idmedecin]);
            console.log(res);
            client.release();
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map