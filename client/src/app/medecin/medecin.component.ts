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
  constructor(public CommunicationService: CommunicationService) { }
  ngOnInit(): void {
    this.medecinSubscription =  this.CommunicationService.getMedecins().subscribe((data: Medecin[]) => {
      console.log(data + 'init')
      this.medecins = data
      console.log(this.medecins)
    });
  }
  
  deleteMedecin(idmedecin: string){
    this.CommunicationService.deleteMedecin(idmedecin).subscribe((data: Medecin[]) => {
      console.log(data + 'delete')
      console.log("idmedecin : " + idmedecin)
      this.medecins = data
      console.log(this.medecins)
    });

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