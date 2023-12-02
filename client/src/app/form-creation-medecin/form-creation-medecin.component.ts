import { Component } from "@angular/core";
import { OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommunicationService } from "../services/communication.service";
import { Medecin } from "../../../../common/interface/medecin";
import { Output } from "@angular/core";


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

 constructor(private fb: FormBuilder, private communicationService: CommunicationService) {
    this.formCreationMedecin = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      specialite: ['', Validators.required],
      annesexperiences: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      idservice: [null, [Validators.required, Validators.min(0), Validators.max(9)]]
    });
  }


  ngOnInit(): void {

  }

  sendField() {
    this.communicationService.saveMedecin(this.medecin).subscribe(() => { 
    })
    this.newMedecins.emit(this.medecin);
    this.formCreationMedecin.reset();

  }

  onFieldClick(): void {
    this.directSubmit = false; 
  }
  onSubmit() {
    console.log("wshh")
    if (this.directSubmit)
      {
         this.medecin = {
          idmedecin: '',
          prenom: 'Zied',
          nom: 'Lahbabi',
          specialite: 'Dermatologie',
          annesexperiences: 7,
          idservice: '0',
        };
      this.sendField();
      }

    if (this.formCreationMedecin.valid) {
      console.log(this.formCreationMedecin.value);
        this.medecin = this.formCreationMedecin.value;
        this.sendField();
    
  }
}
}

