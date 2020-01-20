import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {dictionary} from '../../../helpers/message-constants';
import {AuthService} from 'src/app/services/auth/auth.service';
import {throwError} from 'rxjs';
import {MatSnackBar, ErrorStateMatcher} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

    token = '0';
    hide = true;
    dict = dictionary;
    isLoading = false;
    updateForm = new FormGroup({
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(PASSWORD_REGEX)
        ]),
        passwordRepeat: new FormControl('', [
            Validators.required,
            Validators.pattern(PASSWORD_REGEX)
        ]),
    });

    matcher = new MyErrorStateMatcher();

    constructor(
        public actRoute: ActivatedRoute,
        public router: Router,
        public authService: AuthService,
        public _snackbar: MatSnackBar) {
    }

    ngOnInit() {
        const params = this.actRoute.snapshot.paramMap;
        this.token = params.get(params.keys[0]);
        if (this.token) {
            if (this.token.charAt(this.token.length - 1) !== '.') {
                this.token += '.';
            }
        }
    }

    onSubmit() {
        if (this.updateForm.value.password == this.updateForm.value.passwordRepeat) {
            this.isLoading = true;
            this.authService.updatePassword(this.token, this.updateForm.value.password).subscribe(
                (res: any) => {
                    this.isLoading = false;
                    this._snackbar.open(this.dict.SNACKBAR_SUCCES_REGISTERED, this.dict.SNACKBAR_OK, {
                        duration: 2000,
                    });

                    this.router.navigate(['/']);
                },
                (err) => {
                    this.isLoading = false;
                    throwError('iets ging fout');
                }
            );
        } else {
            this._snackbar.open(this.dict.PASSWORD_MATCH_ERROR, this.dict.SNACKBAR_OK, {
                duration: 2000,
            });
        }
    }

}
