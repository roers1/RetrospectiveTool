import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  description: String;
}

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['../home/home.component.css']
})
export class CreateBoardComponent {

  constructor(
      public dialogRef: MatDialogRef<CreateBoardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
