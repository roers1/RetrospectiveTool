import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreateBoardDialogComponent } from '../boardcreate-dialog/boardcreatedialog.component';
import {RetrospectiveService} from '../../services/retrospective.service';
import {Router} from '@angular/router';
import { dictionary } from '../../../helpers/messageconstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  dict = dictionary;

  constructor(public dialog: MatDialog, private retrospectiveService: RetrospectiveService, private router: Router) {
  }

  ngOnInit(): void {
  }

  opendialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: '400px',
      data: {name: '', description: ''}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('result: ' + JSON.stringify(data));
      if (data) {
        this.retrospectiveService.createRetrospective(data.name, data.description).subscribe((retrospective) => {
          if (retrospective) {
            this.router.navigate([`/board/${retrospective.id}`]);
          } else {
            alert('Something went wrong!');
          }
        });
      }
    });
  }
}
