import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../../../common/interface/medecin';
import { CommunicationService } from '../../../src/app/services/communication.service'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})

export class MedecinComponent implements OnInit {
  private medecinSubscription?: Subscription;

  medecins: Medecin[]
  constructor(private CommunicationService: CommunicationService) { }
  ngOnInit(): void {
    this.medecinSubscription =  this.CommunicationService.getMedecins().subscribe((data: Medecin[]) => {
      this.medecins = data
    });
  }

  ngOnDestroy(): void 
  {
    if(this.medecinSubscription){
      this.medecinSubscription.unsubscribe();
    } 
  }
};