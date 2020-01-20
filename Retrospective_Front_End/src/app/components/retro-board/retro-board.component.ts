import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrospectiveService} from '../../services/retrospective/retrospective.service';
import {RetroColumnService} from '../../services/retrospective/retro-column.service';
import {RetroCardService} from '../../services/retrospective/retro-card.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {dictionary} from '../../../helpers/message-constants';
import * as signalR from '@aspnet/signalr';
import {LogLevel} from '@aspnet/signalr';
import {baseUrl} from '../../../helpers/url-constants';
import {BaseItem} from '../../../models/BaseItem';
import {RetroFamily} from '../../../models/RetroFamily';
import {RetroFamilyService} from '../../services/retrospective/retro-family.service';
import {EditTextDialogComponent} from '../edit-text-dialog/edit-text-dialog.component';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-retro-board',
    templateUrl: './retro-board.component.html',
    styleUrls: ['./retro-board.component.css']
})
export class RetroBoardComponent implements OnInit {

    dict = dictionary;
    enable = false;
    elements = [];
    columns = [];
    enabledColumn = {};
    editedContent = {};
    retrospective: Retrospective;
    isOwner: boolean = false;

    cardGroup: FormGroup = new FormGroup({
        content: new FormControl('', [
            Validators.required,
            Validators.maxLength(1000)
        ])
    });

    listGroup: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.maxLength(40)
        ])
    });

    constructor(
        public retrospectiveService: RetrospectiveService,
        public retroColumnService: RetroColumnService,
        public retroCardService: RetroCardService,
        public retroFamilyService: RetroFamilyService,
        public authService: AuthService,
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


            this.isOwner = this.retrospective.retroUserId == this.authService.currentUser && this.authService.currentUser != null;
            console.log(this.isOwner)
            this.sort();

            this.authService.getEmitter().subscribe(() => {
                this.isOwner = this.retrospective.retroUserId == this.authService.currentUser && this.authService.currentUser != null;
                console.log(this.isOwner)
            });
        });

        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
            .withUrl(baseUrl + `notify`)
            .build();

        connection.start().then(() => {
            console.log('Connected!');
        }).catch(() => {
            console.error('Cannot find board!');
            connection.stop().then(r => console.log(r));
            this.router.navigate(['/error']);
        });

        connection.on(`BroadcastMessage`, (succeeded: boolean, new_id: number) => {
            if (succeeded && id === new_id.toString()) {
                this.retrospectiveService.getRetrospective(id, (retrospective: Retrospective) => {
                    this.retrospective = retrospective;

                    this.sort();
                });
            } else {
                connection.stop().then(r => console.log(r));
                if(this.router.url !== '/dashboard') {
                    this.router.navigate(['/error']);
                }
            }
        });
    }

    sort() {
        this.retrospective.retroColumns.forEach((x) => x.retroItems.sort((a, b) => {
            if (a.position > b.position) {
                return 1;
            } else if (b.position > a.position) {
                return -1;
            } else {
                return 0;
            }
        }));
    }


    drop(event: CdkDragDrop<BaseItem[]>, retroColumn: RetroColumn, retroFamily: RetroFamily) {
        const item: BaseItem = event.previousContainer.data[event.previousIndex];

        if (this.isFamily(item) && retroFamily != null) {
            return;
        }

        if (event.container === event.previousContainer) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.updatePositions(event.container.data, retroColumn);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            this.updatePositions(event.previousContainer.data, retroColumn);
            this.updatePositions(event.container.data, retroColumn);
        }

        if (retroFamily != null) {
            this.updatePositions(retroFamily.retroCards, retroColumn);
        }

        if (this.isRetroCard(item)) {

            const card: RetroCard = <RetroCard>item;

            if (retroFamily != null) {
                card.retroFamilyId = retroFamily.id;
            } else {
                card.retroFamilyId = null;
            }
        }

        this.retroColumnService.updateColumn(retroColumn).subscribe(() => {
        });
        if (event.previousContainer !== event.container && event.previousContainer.data.length > 0) {
            this.retroColumnService.updateColumn(this.retrospective.retroColumns
                .filter(x => x.id === event.previousContainer.data[0].retroColumnId)[0])
                .subscribe(() => {
                });
        }
    }

    updatePositions(retroCards: BaseItem[], retroColumn: RetroColumn) {
        let index = 0;

        for (const retroCard of retroCards) {
            retroCard.position = index;
            retroCard.retroColumnId = retroColumn.id;
            index++;
        }
    }

    getColumnNames(any) {
        if (!this.containsElement(any, this.elements)) {
            this.elements.push(any);
            this.columns.push(any);
        }

        return this.elements;
    }

    getFamilyNames(any) {
        if (!this.containsElement(any, this.elements)) {
            this.elements.push(any);

            console.log(this.columns);
            console.log(this.elements);

        }
        return this.columns;
    }

    containsElement(any, array) {
        for (const a of array) {
            if (a === any) {
                return true;
            }
        }
        return false;
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
                for (const item of column.retroItems) {
                    if (this.isRetroCard(item)) {
                        console.log('!');
                        this.retroCardService.deleteRetroCard(<RetroCard>item).subscribe();
                    } else {
                        this.retroFamilyService.removeRetroFamily(item.id).subscribe();
                    }
                }

                column.retroItems = [];

                this.openSnackBar(this.dict.SNACKBAR_SUCCES_EMPTY, this.dict.SNACKBAR_OK);
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

    updateColumnTitle(column: RetroColumn, newTitle) {
        column.title = newTitle;

        this.retroColumnService.updateColumn(column).subscribe(_ => {
        });
    }

    editColumnTitleDialog(column: RetroColumn) {
        const data = {
            title: 'Bewerken',
            input: column.title,
            message: this.dict.RETROBOARD_EDIT_COLUMN_TITLE_NOTI(column.title)
        };

        this.openEditTextDialog(data, (result) => {
            this.updateColumnTitle(column, result.input);
        });
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
        this.retrospective.retroColumns.forEach(rc => {
            rc.retroItems = [];
        });
        this.retrospectiveService.cleanRetrospective(this.retrospective.id).subscribe(_ => {
        });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
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

    openEditTextDialog(data, cd) {
        const dialogRef = this.dialog.open(EditTextDialogComponent, {
            width: '500px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                cd(result);
            }
        });
    }

    addFamilyDialog(retroColumn: RetroColumn) {
        const data = {
            title: 'Toevoegen',
            input: '',
            message: this.dict.PLACEHOLDER_COLUMN_EDIT
        };

        this.openEditTextDialog(data, (result) => {
            this.addFamily(retroColumn, result.input);
        });
    }

    addFamily(retroColumn: RetroColumn, title) {
        this.retroFamilyService.createRetroFamily(new RetroFamily(
            0,
            title,
            retroColumn.retroItems.length,
            retroColumn.id,
            []
        )).subscribe((retroFamily) => {
            retroColumn.retroItems.push(retroFamily);
        });
    }

    trackByColumn(index: number, column: RetroColumn) {
        if (!column) {
            return null;
        }
        return column.id;
    }

    trackByBaseItem(index: number, item: BaseItem) {
        if (!item) {
            return null;
        }
        return item.id;
    }

    deleteFamilyDialog(retroFamily: RetroFamily, retroColumn: RetroColumn) {
        this.openDialog(this.dict.RETROBOARD_DELETE_FAMILY_NOTI(retroFamily.content), () => {
            this.deleteFamily(retroFamily, retroColumn);
            this.openSnackBar(this.dict.SNACKBAR_SUCCES_DELETE, 'Ok');
        });
    }

    deleteFamily(retroFamily: RetroFamily, retroColumn: RetroColumn) {
        const columnIndex = this.retrospective.retroColumns.indexOf(retroColumn);
        const index = retroColumn.retroItems.indexOf(retroFamily);
        const familyIndex = this.retrospective.retroColumns[columnIndex].retroFamilies.indexOf(retroFamily);
        this.retrospective.retroColumns[columnIndex].retroItems.splice(index, 1);
        this.retrospective.retroColumns[columnIndex].retroFamilies.splice(familyIndex, 1);

        this.retroFamilyService.removeRetroFamily(retroFamily.id).subscribe(_ => {
        });
    }

    updateFamilyTitleDialog(retroFamily: RetroFamily) {
        const data = {
            title: 'Bewerken',
            input: retroFamily.content,
            message: this.dict.RETROBOARD_EDIT_FAMILY_NOTI(retroFamily.content)
        };

        this.openEditTextDialog(data, (result) => {
            this.updateFamilyTitle(retroFamily, result.input);
        });
    }

    updateFamilyTitle(retroFamily: RetroFamily, newTitle) {
        retroFamily.content = newTitle;

        this.retroFamilyService.updateRetroFamily(retroFamily).subscribe(_ => {
        });
    }
}
