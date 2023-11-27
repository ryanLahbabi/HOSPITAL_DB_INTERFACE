import { Component, OnInit } from '@angular/core';
import {  QueryResult } from '../../../../common/interface/medecin';
import { CommunicationService } from '../../../src/app/services/communication.service'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})

export class MedecinComponent implements OnInit {
  public medecinSubscription?: Subscription;

  medecins: QueryResult
  constructor(public CommunicationService: CommunicationService) { }
  ngOnInit(): void {
    this.medecinSubscription =  this.CommunicationService.getMedecins().subscribe((data: QueryResult) => {
      console.log(data + 'init')
      this.medecins = data
      console.log(this.medecins.rows[0].nom)
    });
  }

  ngOnDestroy(): void 
  {
    if(this.medecinSubscription){
      this.medecinSubscription.unsubscribe();
    } 
  }
};