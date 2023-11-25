import { Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
    this.configureRouter();

  }

  public get router(): Router {
    const router: Router = Router();
    return router;
  }
  configureRouter(){
    this.router.get('/', async(req: Request, res: Response)=> {
      console.log("db co")
      try {
        const medecins =  await this.databaseService.getAllMedecins();
        res.send(medecins);
      }
      catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    });
  }
}
