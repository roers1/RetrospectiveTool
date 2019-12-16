import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {MatMenuModule} from '@angular/material/menu';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrospectiveService} from '../../retrospective.service';
import {RetrocolumnService} from '../../retrocolumn.service';
import {RetrocardService} from '../../retrocard.service';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import { MatFormField } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})

export class RetroBoardComponent implements OnInit {

  enable = false;
  elements = [];
  enabledColumn = {};
  enabledColumnTitles = {};
  editedContent = {};
  retrospective: Retrospective = new Retrospective(0, 'Title', 'Description', [
    new RetroColumn(0, 'Todo', [
      new RetroCard(0, 'Nothing', 0),
    ]),
    new RetroColumn(1, 'Doing', [
      new RetroCard(1, 'Nothing', 0),
    ]),
    new RetroColumn(2, 'Done', [
      new RetroCard(2, 'Nothing', 0),
    ])
  ]);

  cardGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  listGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  constructor(
    public retrospectiveService: RetrospectiveService,
    public retroColumnService: RetrocolumnService,
    public retroCardService: RetrocardService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const id = params.get(params.keys[0]);

    this.retrospectiveService.getRetrospective(id, (retrospective) => {
      this.retrospective = retrospective;
    });
  }

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
    this.retroColumnService.createColumn(title, this.retrospective.id).subscribe((column) => {
      this.retrospective.retroColumns.push(column);
    });
  }

  emptyColumn(column: RetroColumn) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Weet je zeker dat je kolom \'' + column.title + '\' wilt leegmaken?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        column.retroCards = [];
        // TODO: ADD SERVICE!
      }
    });
  }

  addCard(column: RetroColumn) {
    const value = this.cardGroup.value;

    this.retroCardService.createCard(column.id, value.content).subscribe((card) => {
      column.retroCards.push(card);
    });
  }

  deleteColumn(givenColumn: RetroColumn) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Weet je zeker dat je kolom \'' + givenColumn.title + '\' wilt verwijderen?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.retrospective.retroColumns.indexOf(givenColumn);
        this.retrospective.retroColumns.splice(index, 1);
      }
    });
  }

//   editColumnTitle(givenColumn: RetroColumn) {
//     // this method should be edited.
//     })
// }
    editColumnTitle(givenColumn: RetroColumn) {
    // this method should be edited.
    }


  deleteCard(givenCard: RetroCard) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Weet je zeker dat je deze kaart wilt verwijderen?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrospective.retroColumns.forEach(column => {
          column.retroCards.forEach(card => {
            if (card.id === givenCard.id) {
              const index = column.retroCards.indexOf(givenCard);
              column.retroCards.splice(index, 1);
            }
          });

        });
        // TODO ADD SERVICE!
      }
    });
  }

  updateContent(card: RetroCard, content) {
    card.content = content;
    this.enableContentEditing(false, card);
    // TODO ADD SERVICE!
  }

  updateColumnTitle(column: RetroColumn, newtitle) {
    column.title = newtitle
    this.enableColumnTitleEditing(false, column);
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

  enableColumnTitleEditing(bool: boolean, column: RetroColumn) {
    this.enabledColumnTitles = {};
    this.enabledColumnTitles[column.id] = bool;
  }

  hasEnabledColumnTitleEditing(column: RetroColumn) {
    if (!this.enabledColumnTitles[column.id]) {
      this.enabledColumnTitles[column.id] = false;
    }

    return this.enabledColumnTitles[column.id];
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

  cleanRetroBoard() {
    if (confirm('Weet je zeker dat je de retrospective with opschonen? (kan niet ongedaan maken)')) {
      this.retrospective = null;
      this.retrospectiveService.removeRetrospective();

      this.router.navigate(['']);
    }
  }
}
