// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Medecin } from "../../../../common/interface/medecin";


@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
private readonly BASE_URL: string = "http://localhost:3000/api/medecins";
public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();
  
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

//   // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
// private handleError<T>(
//     request: string,
//     result?: T
//   ): (error: Error) => Observable<T> {
//     return (error: Error): Observable<T> => {
//       return of(result as T);
//     };
//   }

  getMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.BASE_URL);
  }
}
