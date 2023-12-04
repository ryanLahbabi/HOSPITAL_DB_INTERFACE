import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Medecin } from "@app/interface/medecin";
@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "hopital_bd",
    password: "0604371187",
    port: 5433,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };
  
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
  private isConstraintDropped: boolean = false;  


  async getAllMedecins(): Promise<Medecin[]>{
    const client =  await this.pool.connect();
    const res = await client.query('SELECT * FROM Medecins ORDER BY idMedecin ASC;');
    console.log(res)
    const medecins: Medecin[] = res.rows.map(row => ({
      idmedecin: row.idmedecin.toString(),
      prenom: row.prenom,
      nom: row.nom,
      specialite: row.specialite,
      annesexperiences: row.anneesexperience, 
      idservice: row.idservice.toString() 
    }));
    client.release()
    
    return medecins;
  }

  async deleteMedecin(id: string): Promise<void>{ 
    const client =  await this.pool.connect();

    if (!this.isConstraintDropped) {

      await client.query('ALTER TABLE rendezvous DROP CONSTRAINT IF EXISTS rendezvous_idmedecin_fkey;');
      this.isConstraintDropped = true; 
    }

    const res = await client.query('DELETE FROM Medecins WHERE idmedecin = $1;', [id]);
    console.log(res);
    client.release();
  }

  async addMedecin(medecin: Medecin): Promise<void>{
    const client =  await this.pool.connect();
    const resId = await client.query('SELECT idmedecin FROM Medecins ORDER BY idmedecin DESC LIMIT 1');
    const lastId = resId.rows[0].idmedecin;
    medecin.idmedecin = (parseInt(lastId) + 1).toString();
    const res = await client.query('INSERT INTO Medecins (idmedecin, prenom, nom, specialite, anneesexperience, idservice) VALUES ($1, $2, $3, $4, $5, $6);', [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice]);
    console.log(res);
    client.release();
  }

  async updateMedecin(medecin: Medecin): Promise<void>{
    const client =  await this.pool.connect();
    const res = await client.query('UPDATE Medecins SET prenom = $1, nom = $2, specialite = $3, anneesexperience = $4, idservice = $5 WHERE idmedecin = $6;', [medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice, medecin.idmedecin]);
    console.log(res);
    client.release();
  }

}
