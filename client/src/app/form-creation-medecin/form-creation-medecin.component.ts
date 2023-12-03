import { Component } from "@angular/core";
import { OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommunicationService } from "../services/communication.service";
import { Medecin } from "../../../../common/interface/medecin";
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

const DIALOG_CUSTOM_CONGIF = { autoFocus: false, panelClass: 'custom-dialog' } as MatDialogConfig;



@Component({
  selector: "app-form-creation-medecin",
  templateUrl: "./form-creation-medecin.component.html",
  styleUrls: ["./form-creation-medecin.component.css"],
})
export class FormCreationMedecinComponent implements OnInit {
  formCreationMedecin: FormGroup;
  medecin: Medecin;
  directSubmit = true;
  @Output() newMedecins = new EventEmitter<Medecin>();

 constructor(private fb: FormBuilder, private communicationService: CommunicationService, public dialog: MatDialog) {
    this.formCreationMedecin = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      specialite: ['Dermatologie', Validators.required],
      annesexperiences: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      idservice: ['0', [Validators.required, Validators.min(0), Validators.max(9)]]
    });
  }

  ngOnInit(): void {

  }

  sendField() {
    this.communicationService.saveMedecin(this.medecin).subscribe(() => { 
    })
    this.newMedecins.emit(this.medecin);
    this.formCreationMedecin.reset({
      prenom: 'Zied',
      nom: 'Lahbabi',
      specialite: 'Dermatologie', 
      annesexperiences: 15,
      idservice: '0'
    });
  }

  onFieldClick(): void {
    this.directSubmit = false; 
  }
  onSubmit() {

    if (this.directSubmit)
    {
       this.medecin = {
        idmedecin: '',
        prenom: 'Zied',
        nom: 'Lahbabi',
        specialite: 'Dermatologie',
        annesexperiences: 15,
        idservice: '0',
      };
    this.sendField();
    }

    

    else if (this.formCreationMedecin.valid) {
      console.log('SLT')
      this.medecin = this.formCreationMedecin.value;
      this.sendField();
  }
  else{
    this.warnUser();

  }
}

private warnUser() {
  const dialogConfig = Object.assign({}, DIALOG_CUSTOM_CONGIF);
  dialogConfig.data = 'modifier les valeurs insérée';
  return this.dialog.open(WarningDialogComponent, dialogConfig);
}
}

