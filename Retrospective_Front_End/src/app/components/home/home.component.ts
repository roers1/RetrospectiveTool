import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardDialogComponent} from '../board-create-dialog/board-create-dialog.component';
import {RetrospectiveService} from '../../services/retrospective/retrospective.service';
import {Router} from '@angular/router';
import {dictionary} from '../../../helpers/message-constants';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    dict = dictionary;

    constructor(
        public dialog: MatDialog,
        private retrospectiveService: RetrospectiveService,
        public authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
            width: '400px',
            data: {name: '', description: ''}
        });

        // dialogRef.afterClosed().subscribe(data => {
        //   console.log('result: ' + JSON.stringify(data));
        //   if (data) {

        //   }
        // });
    }
}
