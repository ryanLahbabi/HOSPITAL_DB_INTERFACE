import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
//import { Medecin } from '../../../common/interface/medecin'

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hopital_bd",
    password: "0604371187",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };
  
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllMedecins(): Promise<pg.QueryResult>{
    console.log("requetes")
    const client =  await this.pool.connect();
    const res = await client.query('SELECT * FROM Medecins;');
    console.log(res)
    client.release()
    return res;
  }
}
