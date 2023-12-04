import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-input-warning-dialog',
  templateUrl: './missing-input-warning-dialog.component.html',
  styleUrls: ['./missing-input-warning-dialog.component.css']
})
export class MissingInputWarningDialogComponent  {
  constructor(public dialogRef: MatDialogRef<MissingInputWarningDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  closeDialog(choice: boolean) {
      this.dialogRef.close(choice);
  }
}
