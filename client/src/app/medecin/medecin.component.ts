import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../src/app/services/communication.service'
import { Subscription } from 'rxjs';
import { Medecin } from '../../../../common/interface/medecin';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { MissingInputWarningDialogComponent } from '../missing-input-warning-dialog/missing-input-warning-dialog.component';



const DIALOG_CUSTOM_CONGIF = { autoFocus: false, panelClass: 'custom-dialog' } as MatDialogConfig;



@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})

export class MedecinComponent implements OnInit {
  public medecinSubscription?: Subscription;
  originalMedecinValues: { [idmedecin: string]: Medecin } = {}; 



  medecins: Medecin[]=[];
  idMedecinModifying: number | null = null;


  constructor(public CommunicationService: CommunicationService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.medecinSubscription =  this.CommunicationService.getMedecins().subscribe((data: Medecin[]) => {
      this.medecins = data
    });
  }
  startModification(idmedecin: number){
    this.idMedecinModifying = idmedecin;
    const medecin = this.medecins.find(medecin => medecin.idmedecin === idmedecin.toString());
    
    if (medecin) {
      this.originalMedecinValues[idmedecin.toString()] = { ...medecin };
    } 
    
  }

  saveModification(medecin: Medecin){
    if(!this.verifyValues(medecin)){
      this.warnUser()
      this.cancelModification(medecin.idmedecin)
    }
    else if(!this.verifyMissingInput(medecin)){
      this.cancelModification(medecin.idmedecin)
      this.warnMissingUser()
    }
    else{
      this.CommunicationService.updateMedecin(medecin).subscribe((data: Medecin[]) => {
        this.medecins = data
      });
    }
    this.idMedecinModifying = null;
  }
  cancelModification(idmedecin: string){
    if (this.idMedecinModifying !== null) {
      const index = this.medecins.findIndex(medecin => medecin.idmedecin === idmedecin);
      if (index !== -1) {
        this.medecins[index] = this.originalMedecinValues[this.idMedecinModifying];
      }
    }
    this.idMedecinModifying = null;

  }
  deleteMedecin(idmedecin: string){
    this.CommunicationService.deleteMedecin(idmedecin).subscribe(() => {
      this.medecins = this.medecins.filter(medecin => medecin.idmedecin !== idmedecin);})
  }

  private warnUser() {
    const dialogConfig = Object.assign({}, DIALOG_CUSTOM_CONGIF);
    dialogConfig.data = 'modifier les valeurs insérée';
    return this.dialog.open(WarningDialogComponent, dialogConfig);
}

private warnMissingUser() {
  const dialogConfig = Object.assign({}, DIALOG_CUSTOM_CONGIF);
  dialogConfig.data = 'modifier les valeurs insérée';
  return this.dialog.open(MissingInputWarningDialogComponent, dialogConfig);
}

  addMedecin(medecin: Medecin){
    if(!this.verifyValues(medecin)){

      this.warnUser();
    }
     if(!this.verifyMissingInput(medecin)){
      this.warnMissingUser();
    }
    else{
      
    medecin.idmedecin = (parseInt( this.medecins[this.medecins.length-1].idmedecin) + 1).toString();

    this.medecins.push(medecin);
    }
  }

  updateMedecin(medecin: Medecin){
    this.CommunicationService.updateMedecin(medecin).subscribe((data: Medecin[]) => {
      this.medecins = data
    });
  }

  verifyValues(medecin: Medecin): boolean {

    if (typeof medecin.annesexperiences === 'number' && medecin.annesexperiences >= 0 && medecin.annesexperiences <= 99 ) {
      if (typeof medecin.prenom === 'string' ) 
      if (typeof medecin.nom === 'string' ) 
        return true;
      }
    
    return false; 
  }

  verifyMissingInput(medecin: Medecin): boolean {

      if ( medecin.prenom === '' || medecin.nom === '' ) 
        return false;

      return true; 
  }
  

  ngOnDestroy(): void 
  {
    if(this.medecinSubscription){
      this.medecinSubscription.unsubscribe();
    } 
  }
};