export interface Medecin{
    idmedecin: string;
    prenom: string;
    nom: string;
    specialite: string;
    annesexperiences: number;
    idservice: string;
  }

  export interface QueryResult {
    command: string;
    rowCount: number;
    oid: number | null;
    rows: Medecin[];
    _parsers: Array<Function | null>;
    RowCtor: null | Function;
    rowAsArray: boolean;
  }
  