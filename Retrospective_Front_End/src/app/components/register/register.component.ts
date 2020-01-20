import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {dictionary} from '../../../helpers/message-constants';
import {AuthService} from 'src/app/services/auth/auth.service';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dict = dictionary;
  hide = true;
  errorBool = true;

  registerForm = new FormGroup({
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
        public authService: AuthService,
        public _snackBar: MatSnackBar,
        public router: Router,
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.authService.signUp(this.registerForm.value).subscribe(
            (res: any) => {
                this._snackBar.open(this.dict.SNACKBAR_SUCCES_REGISTERED, this.dict.SNACKBAR_OK, {
                    duration: 2000,
                });

        this.router.navigate(['/'])
      },
      (err) => {
        if(err.status == 409){
            this.errorBool = false;
        } else {
          this.router.navigate(['/error']);
        }
      }
    )
  }

}
