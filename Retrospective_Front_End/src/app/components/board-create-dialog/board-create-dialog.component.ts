import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {dictionary} from '../../../helpers/message-constants';
import {RetrospectiveService} from 'src/app/services/retrospective/retrospective.service';
import {Router} from '@angular/router';

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
    templateUrl: './board-create-dialog.component.html',
    styleUrls: ['../home/home.component.css', './board-create-dialog.component.css']
})
export class CreateBoardDialogComponent {

    dict = dictionary;
    isLoading = false;

  boardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    description: new FormControl('', [
      Validators.maxLength(200)
    ]),
  });

    matcher = new MyErrorStateMatcher();

    constructor(
        public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
        public retrospectiveService: RetrospectiveService,
        public router: Router,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.isLoading = true;
        this.retrospectiveService.createRetrospective(this.boardForm.value.name, this.boardForm.value.description).subscribe((retrospective) => {
            this.isLoading = false;

            if (retrospective) {
                this.router.navigate([`/board/${retrospective.id}`]);
            } else {
                alert('Something went wrong!');
            }
            this.dialogRef.close();
        });
    }
}
