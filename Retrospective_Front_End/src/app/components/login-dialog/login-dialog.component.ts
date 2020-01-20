import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { dictionary } from '../../../helpers/message-constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { EditTextDialogComponent } from '../edit-text-dialog/edit-text-dialog.component';

export interface DialogData {
    email: string;
    password: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
    selector: 'app-login',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['../home/home.component.css', './login-dialog.component.css']
})


export class LoginDialogComponent {

  dict = dictionary;
  isLoading = false;
  errorBool = true;


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_REGEX),
    ]),
  });

    matcher = new MyErrorStateMatcher();

    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        public authService: AuthService,
        public _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.isLoading = true;
        this.authService.signIn(this.loginForm.value).subscribe(
            (res: any) => {
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('user_id', res.id);
                this.authService.currentUser = res.id;

                this._snackBar.open('Succesvol ingelogd', 'Ok', {
                    duration: 2000,
                });

        this.isLoading = false;
        this.authService.activateEmit();
        this.dialogRef.close();
      },
      (err) => {
        if(err.status == 401){
        this.errorBool = false;
        } else {
          this.router.navigate(['/error']);
          this.dialogRef.close();
        }
        this.isLoading = false;

      }
    )
  }

    onRecoverPassword() {
        const data = {
            title: 'Wachtwoord herstellen',
            input: '',
            message: 'Voer je email in:'
        };

        const dialogRef = this.dialog.open(EditTextDialogComponent, {
            width: '400px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.authService.recoverAccount(result.input).subscribe(r => {
                });
                // this._snackBar.open('', action, {
                //   duration: 2000,
                // });
            }

        });
    }
}
