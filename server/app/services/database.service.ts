import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Medecin } from "@app/interface/medecin";
@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hopitalDB",
    password: "Badrlpb1",
    port: 5434,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };
  
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllMedecins(): Promise<Medecin[]>{
    console.log("requetes")
    const client =  await this.pool.connect();
    const res = await client.query('SELECT * FROM Medecins;');
    console.log(res)
    const medecins: Medecin[] = res.rows.map(row => ({
      idmedecin: row.idmedecin.toString(), // Conversion en string si nécessaire
      prenom: row.prenom,
      nom: row.nom,
      specialite: row.specialite,
      annesexperiences: row.anneesexperience, // Assurez-vous que les noms correspondent
      idservice: row.idservice.toString() // Conversion en string si nécessaire
    }));
    client.release()
    
    return medecins;
  }

  async deleteMedecin(id: string): Promise<void>{ 
    console.log(" id delete"+ id);
    const client =  await this.pool.connect();
    const res = await client.query('DELETE FROM Medecins WHERE idmedecin = $1;', [id]);
    console.log(res);
    client.release();
 
  }

}
