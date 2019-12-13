import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {MatMenuModule} from '@angular/material/menu';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})

export class RetroBoardComponent implements OnInit {
  enable = false;
  elements = [];
  enabledColumn = {};
  editedContent = {};
  retrospective: Retrospective = new Retrospective(0, 'Title', 'Description', [
    new RetroColumn(0, 'Todo', [
      new RetroCard(0, 'Nothing', 0),
    ])
  ]);

  constructor(public dialog: MatDialog) {}

  cardGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
  listGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  drop(event: CdkDragDrop<RetroCard[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getColumnNames(any) {
    this.elements.push(any);

    return this.elements;
  }


  // addCard()

  addColumn(title) {
    this.retrospective.retroColumns.push(
      new RetroColumn(this.retrospective.retroColumns.length, title, [])
    );
    // TODO: ADD SERVICE!
  }

  emptyColumn(column: RetroColumn) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: "Weet je zeker dat je kolom '" + column.title + "' wilt leegmaken?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        column.cards = [];
        // TODO: ADD SERVICE!
      }
    });
  }

  addCard(column: RetroColumn) {
    const value = this.cardGroup.value;

    column.cards.push(
      new RetroCard(column.cards.length, value.content, column.cards.length)
    );

    // TODO ADD SERVICE!
  }
  deleteColumn(givenColumn: RetroColumn) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: "Weet je zeker dat je kolom '" + givenColumn.title + "' wilt verwijderen?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let index = this.retrospective.retroColumns.indexOf(givenColumn);
        this.retrospective.retroColumns.splice(index, 1);
      }
    });
  }
  deleteCard(givenCard: RetroCard) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: "Weet je zeker dat je deze kaart wilt verwijderen?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.retrospective.retroColumns.forEach(column => {
          column.cards.forEach(card => {
            if(card.id == givenCard.id) {
              let index = column.cards.indexOf(givenCard);
              column.cards.splice(index, 1)
            }
          });
  
        });
        // TODO ADD SERVICE!
      }
    });
  }

  updateContent(card: RetroCard, content) {
    card.content = content;
    this.enableContentEditing(false, card)
    // TODO ADD SERVICE!
  }

  enableContentEditing(bool: boolean, card: RetroCard) {
    this.editedContent[card.id] = bool;
  }

  hasEnabledContentEditing(card: RetroCard) {
    if (!this.editedContent[card.id]) {
      this.editedContent[card.id] = false;
    }

    return this.editedContent[card.id];
  }

  enableEditing(bool: boolean, column: RetroColumn) {
    this.enabledColumn = {};
    this.enabledColumn[column.id] = bool;
  }

  hasEnabledEditing(column: RetroColumn) {
    if (!this.enabledColumn[column.id]) {
      this.enabledColumn[column.id] = false;
    }

    return this.enabledColumn[column.id];
  }

  ngOnInit() {
  }
}
