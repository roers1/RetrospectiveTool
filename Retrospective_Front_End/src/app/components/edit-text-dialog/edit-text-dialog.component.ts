import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {dictionary} from '../../../helpers/message-constants';

export interface DialogData {
    title: string,
    input: string;
    message: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-edit-text',
    templateUrl: './edit-text-dialog.component.html',
    styleUrls: ['../home/home.component.css', './edit-text.dialog.component.css']
})
export class EditTextDialogComponent {

    dict = dictionary;

  TextFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40)
  ]);

    matcher = new MyErrorStateMatcher();

    constructor(
        public dialogRef: MatDialogRef<EditTextDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
