import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebTokenInterface } from '../home.component';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WebTokenInterface,
    private dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
    console.log(this.data);
  }
}
