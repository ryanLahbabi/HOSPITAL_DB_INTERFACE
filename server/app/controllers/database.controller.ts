import { Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { StatusCodes } from "http-status-codes";

@injectable()
export class DatabaseController {
  router: Router;
  constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {
    this.configureRouter();
  }

  // public get router(): Router {
  //   const router: Router = Router();
  //   return router;
  // }
  configureRouter() {
    this.router = Router();
    this.router.get("/", async (req: Request, res: Response) => {
      console.log("db co");
      try {
        console.log("je suis dans le get");
        const medecins = await this.databaseService.getAllMedecins();
        console.log(medecins + " mes medecins");
        res.send(medecins);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    });

    this.router.delete("/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      console.log(id + " id");
      try {
        const suppression = await this.databaseService.deleteMedecin(id);
        console.log(suppression);
        res.status(StatusCodes.NO_CONTENT).send();
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    });

    this.router.post("/", async (req: Request, res: Response) => {
      const medecin = req.body;
      console.log(medecin + " medecin du post" + typeof(medecin)+ 'type medecin');
      try {
        const ajout = await this.databaseService.addMedecin(medecin);
        console.log(ajout);
        res.status(StatusCodes.CREATED).send();
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    });

    this.router.put("/", async (req: Request, res: Response) => {
      const medecin = req.body;
      console.log(medecin + " medecin");
      try {
        const ajout = await this.databaseService.updateMedecin(medecin);
        console.log(ajout);
        res.send(200).send(ajout);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    });
  }
}
