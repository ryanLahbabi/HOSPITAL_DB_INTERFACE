import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../src/app/services/communication.service'
import { Subscription } from 'rxjs';
import { Medecin } from '../../../../common/interface/medecin';



@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})

export class MedecinComponent implements OnInit {
  public medecinSubscription?: Subscription;

  medecins: Medecin[]=[];
  idMedecinModifying: number | null = null;

  constructor(public CommunicationService: CommunicationService) { }
  ngOnInit(): void {
    this.medecinSubscription =  this.CommunicationService.getMedecins().subscribe((data: Medecin[]) => {
      console.log(data + 'init')
      this.medecins = data
      console.log(this.medecins)
    });
  }
  startModification(idmedecin: number){
    this.idMedecinModifying = idmedecin;
  }
  saveModification(medecin: Medecin){
    this.idMedecinModifying = null;
    this.CommunicationService.updateMedecin(medecin).subscribe((data: Medecin[]) => {
      console.log(data + 'update')
      this.medecins = data
      console.log(this.medecins)
    });
  }
  cancelModification(){
    this.idMedecinModifying = null;
  }
  deleteMedecin(idmedecin: string){
    this.CommunicationService.deleteMedecin(idmedecin).subscribe(() => {
      this.medecins = this.medecins.filter(medecin => medecin.idmedecin !== idmedecin);})
  }

  // newMedecin(){
  //   console.log("new medecin")
  //   this.medecin
  // }

  saveMedecin(medecin: Medecin){
    // this.CommunicationService.saveMedecin(medecin).subscribe((data: Medecin[]) => {
    //   console.log(data + 'save')
    //   this.medecins = data
    //   console.log(this.medecins)
    // });
  }

  updateMedecin(medecin: Medecin){
    this.CommunicationService.updateMedecin(medecin).subscribe((data: Medecin[]) => {
      console.log(data + 'update')
      this.medecins = data
      console.log(this.medecins)
    });
  }

  ngOnDestroy(): void 
  {
    if(this.medecinSubscription){
      this.medecinSubscription.unsubscribe();
    } 
  }
};