import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface DialogData {
  name: string;
  description: String;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['../home/home.component.css']
})
export class CreateBoardComponent {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(new RegExp("^[a-zA-Z0-9 ]{2,50}$"))
  ]);  

  matcher = new MyErrorStateMatcher();

  constructor(
      public dialogRef: MatDialogRef<CreateBoardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
