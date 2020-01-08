import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrospectiveService} from '../../services/retrospective.service';
import {RetroColumnService} from '../../services/retro-column.service';
import {RetroCardService} from '../../services/retro-card.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {dictionary} from '../../../helpers/message-constants';
import * as signalR from '@aspnet/signalr';
import {LogLevel} from '@aspnet/signalr';
import * as url from '../../../helpers/url-constants';
import {baseUrl} from '../../../helpers/url-constants';
import {BaseItem} from '../../../models/BaseItem';
import {RetroFamily} from '../../../models/RetroFamily';
import {RetroFamilyService} from '../../services/retro-family.service';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})
export class RetroBoardComponent implements OnInit {

  dict = dictionary;
  enable = false;
  elements = [];
  enabledColumn = {};
  enabledColumnTitles = {};
  editedContent = {};
  retrospective: Retrospective;

  cardGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  listGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  constructor(
    public retrospectiveService: RetrospectiveService,
    public retroColumnService: RetroColumnService,
    public retroCardService: RetroCardService,
    public retroFamilyService: RetroFamilyService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public router: Router) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const id = params.get(params.keys[0]);

    this.retrospectiveService.getRetrospective(id, (retrospective: Retrospective) => {
      this.retrospective = retrospective;

      this.retrospective.retroColumns.forEach((x) => x.retroItems.sort((a, b) => {
        if (a.position > b.position) {
          return 1;
        } else if (b.position > a.position) {
          return -1;
        } else {
          return 0;
        }
      }));
    });

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(baseUrl + `notify`)
      .build();

    connection.start().then(() => {
      console.log('Connected!');
    }).catch(() => {
      return console.error('Cannot find board!');
    });

    connection.on(`BroadcastMessage`, (succeeded: boolean, new_id: number) => {
      if (succeeded && id === new_id.toString()) {
        this.retrospectiveService.getRetrospective(id, (retrospective: Retrospective) => {
          this.retrospective = retrospective;

          this.retrospective.retroColumns.forEach((x) => x.retroItems.sort((a, b) => {
            if (a.position > b.position) {
              return 1;
            } else if (b.position > a.position) {
              return -1;
            } else {
              return 0;
            }
          }));
        });
      }
    });
  }

  drop(event: CdkDragDrop<BaseItem[]>, retroColumn: RetroColumn, retroFamily: RetroFamily) {
    if (retroFamily != null) {
      this.updatePositions(retroFamily.retroCards);
      for (const card of retroFamily.retroCards) {
        card.familyId = retroFamily.id;
      }

      this.retroFamilyService.updateRetroFamily(retroFamily);
    }

    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updatePositions(event.container.data);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.updatePositions(event.container.data);
      this.updatePositions(event.previousContainer.data);

      this.retroColumnService.updateColumn(retroColumn).subscribe(() => {});
      this.retroColumnService.updateColumn(this.retrospective.retroColumns
        .filter(x => x.id === event.previousContainer.data[0].retroColumnId)[0])
        .subscribe(() => {});
    }
  }

  updatePositions(retroCards: BaseItem[]) {
    let index = 0;

    for (const retroCard of retroCards) {
      retroCard.position = index;
      index++;
    }
  }

  getColumnNames(any) {
    this.elements.push(any);

    return this.elements;
  }

  addColumn(title) {
    this.retroColumnService.createColumn(title, this.retrospective.id).subscribe((column) => {
      this.listGroup.get('title').setValue('');
      this.retrospective.retroColumns.push(column);
    });
  }

  emptyColumn(column: RetroColumn) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: this.dict.RETROBOARD_EMPTY_COLUMN_NOTI(column.title)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        column.retroItems = [];
        // TODO: ADD SERVICE!
        this.openSnackBar(this.dict.SNACKBAR_SUCCES_EMPTY, 'Ok');
      }
    });
  }

  addCard(column: RetroColumn) {
    const value = this.cardGroup.value;

    this.retroCardService.createCard(column.id, column.retroItems.length, value.content).subscribe((card) => {
      this.cardGroup.get('content').setValue('');
      column.retroItems.push(card);
    });
  }

  deleteColumnDialog(column: RetroColumn) {
    this.openDialog(this.dict.RETROBOARD_DELETE_COLUMN_NOTI(column.title), () => {
      this.deleteColumn(column);
      this.openSnackBar(this.dict.SNACKBAR_SUCCES_DELETE, 'Ok');
    });
  }

  deleteColumn(givenColumn) {
    const index = this.retrospective.retroColumns.indexOf(givenColumn);
    this.retrospective.retroColumns.splice(index, 1);

    this.retroColumnService.removeColumn(givenColumn.id).subscribe(_ => {
    });
  }

  openDialog(data, cd) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        cd();
      }
    });
  }

  deleteCardDialog(givenCard: RetroCard) {
    this.openDialog(this.dict.RETROBOARD_DELETE_CARD_NOTI, () => {
      this.deleteCard(givenCard);
      this.openSnackBar(this.dict.SNACKBAR_SUCCES_DELETE, 'Ok');
    });
  }

  deleteCard(givenCard: RetroCard) {
    this.retrospective.retroColumns.forEach(column => {
      column.retroItems.forEach(card => {
        if (card.id === givenCard.id) {
          const index = column.retroItems.indexOf(givenCard);
          column.retroItems.splice(index, 1);
        }
      });
    });
    this.retroCardService.deleteRetroCard(givenCard.id).subscribe(_ => { });
  }

  updateContent(card: RetroCard, content) {
    card.content = content;
    this.enableContentEditing(false, card);

    this.retroCardService.updateRetroCard(card)
      .subscribe(_ => {
      });
  }

  updateColumnTitle(column: RetroColumn, newTitle) {
    column.title = newTitle;
    this.enableColumnTitleEditing(false, column);

    this.retroColumnService.updateColumn(column).subscribe(_ => {
    });
  }

  enableContentEditing(bool: boolean, card: RetroCard) {
    this.editedContent[card.id] = bool;
  }

  hasEnabledContentEditing(card: BaseItem) {
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

  cleanRetroBoardDialog() {
    this.openDialog(this.dict.RETROBOARD_CLEAN_ACTION_CONFIRM_NOTI, () => {
      this.cleanRetroBoard();
    });
  }

  cleanRetroBoard() {
    this.router.navigate([`/`]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  voteUp(card: RetroCard) {
    if (card.upVotes == null) {
      card.upVotes = 0;
    }
    card.upVotes++;

    this.retroCardService.updateRetroCard(card).subscribe(_ => {
    });
  }

  voteDown(card: RetroCard) {
    if (card.downVotes == null) {
      card.downVotes = 0;
    }
    card.downVotes++;

    this.retroCardService.updateRetroCard(card).subscribe(_ => {
    });
  }

  isRetroCard(item) {
    return item.hasOwnProperty('upVotes');
  }

  isFamily(item) {
    return item.hasOwnProperty('retroCards');
  }

  castRetroCard(item: BaseItem): RetroCard {
    return Object.assign(item, null);
  }

  castFamily(item: BaseItem): RetroFamily {
    return Object.assign(item, null);
  }

  addFamily(retroColumn: RetroColumn) {
    this.retroFamilyService.createRetroFamily(new RetroFamily(
      0,
      'Okay',
      retroColumn.retroItems.length,
      retroColumn.id,
      []
    )).subscribe((retroFamily) => {
      retroColumn.retroItems.push(retroFamily);
    });
  }
}
