import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {AuthService} from 'src/app/services/auth/auth.service';
import {dictionary} from '../../../helpers/message-constants';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;
    isLoggedIn = false;
    dict = dictionary;

    constructor(public dialog: MatDialog, public authService: AuthService, public _snackBar: MatSnackBar) {
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    login() {

        const data = {
            email: '',
            password: ''
        };

        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '500px',
            data: data
        });
    }

    logout() {
        this.authService.doLogout();
        this._snackBar.open(this.dict.SNACKBAR_SUCCES_LOGGED_OUT, this.dict.SNACKBAR_OK, {
            duration: 2000,
        });
    }
}
