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
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };
  
  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllMedecins(): Promise<Medecin[]>{
    console.log("requetes")
    const client =  await this.pool.connect();
    const res = await client.query('SELECT * FROM Medecins ORDER BY idMedecin ASC;');
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

  async addMedecin(medecin: Medecin): Promise<void>{
    console.log("medecin add dans db service add medecine : " + medecin.annesexperiences + 'medecin annes' + medecin.idservice + 'medecin idservice'+ medecin.idmedecin + 'medecin idmedecin');
    const client =  await this.pool.connect();
    const resId = await client.query('SELECT idmedecin FROM Medecins ORDER BY idmedecin DESC LIMIT 1');
    const lastId = resId.rows[0].idmedecin;
    medecin.idmedecin = (parseInt(lastId) + 1).toString();
    const res = await client.query('INSERT INTO Medecins (idmedecin, prenom, nom, specialite, anneesexperience, idservice) VALUES ($1, $2, $3, $4, $5, $6);', [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice]);
    console.log(res);
    client.release();
  }

  async updateMedecin(medecin: Medecin): Promise<void>{
    console.log("medecin : " + medecin);
    const client =  await this.pool.connect();
    const res = await client.query('UPDATE Medecins SET prenom = $1, nom = $2, specialite = $3, anneesexperience = $4, idservice = $5 WHERE idmedecin = $6;', [medecin.prenom, medecin.nom, medecin.specialite, medecin.annesexperiences, medecin.idservice, medecin.idmedecin]);
    console.log(res);
    client.release();
  }

}
