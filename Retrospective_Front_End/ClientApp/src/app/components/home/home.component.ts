import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreateBoardComponent } from '../boardcreate-dialog/boardcreatedialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  name: String = "";
  description: String = "";

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  opendialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '400px',
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('result: ' + JSON.stringify(data));
      // this.name = data.name;
      // this.description = data.description;
    });
  }
}
