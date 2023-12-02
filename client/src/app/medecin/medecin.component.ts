import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../src/app/services/communication.service'
import { Subscription } from 'rxjs';
import { Medecin } from '../../../../common/interface/medecin';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';



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
      console.log(data + 'init')
      this.medecins = data
      console.log(this.medecins)
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
    this.idMedecinModifying = null;
    this.warnUser()
    this.CommunicationService.updateMedecin(medecin).subscribe((data: Medecin[]) => {
      console.log(data + 'update')
      this.medecins = data
      console.log(this.medecins)
    });
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

  addMedecin(medecin: Medecin){
    console.log(medecin + 'medecin de mon form');
    medecin.idmedecin = (this.medecins.length + 5).toString();
    this.medecins.push(medecin);
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