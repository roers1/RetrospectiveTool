import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Retrospective} from '../../../../models/Retrospective';
import {RetrospectiveService} from 'src/app/services/retrospective/retrospective.service';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {EditTextDialogComponent} from '../../edit-text-dialog/edit-text-dialog.component';
import {dictionary} from '../../../../helpers/message-constants';

@Component({
    selector: 'app-retro-item',
    templateUrl: './retro-item.component.html',
    styleUrls: ['./retro-item.component.css']
})
export class RetroItemComponent implements OnInit {

    @Input() retrospective: Retrospective;
    @Output() output = new EventEmitter<number>();
    columnCount = 0;
    cartCount = 0;
    familyCount = 0;
    isDestroyed = false;
    dict = dictionary;

    constructor(public retrospectiveService: RetrospectiveService, public dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.retrospective) {
            this.columnCount = this.retrospective.retroColumns.length;
            this.retrospective.retroColumns.forEach(column => {
                this.cartCount += column.retroCards.length;
                this.familyCount += column.retroFamilies.length;

                column.retroFamilies.forEach(family => {
                    this.cartCount += family.retroCards.length
                });
            });
        }
    }

    isRetroCard(item) {
        return item.hasOwnProperty('upVotes');
    }

    isFamily(item) {
        return item.hasOwnProperty('retroCards');
    }

    removeRetrospective() {
        const data = 'Weet je zeker dat je deze retrospective wilt verwijderen?';

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isDestroyed = true;
                this.retrospectiveService.deleteRetrospective(this.retrospective).subscribe(_ => {
                });
                this.output.emit(this.retrospective.id);
                this.retrospective = null;
            }
        });
    }

    editRetrospectiveTitle() {
        const data = {
            title: 'Bewerken',
            input: this.retrospective.title,
            message: this.dict.PLACEHOLDER_COLUMN_EDIT
        };

        const dialogRef = this.dialog.open(EditTextDialogComponent, {
            width: '500px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.retrospective.title = result.input;
                this.retrospectiveService.updateRetrospective(this.retrospective).subscribe(_ => {
                });
            }
        });
    }

}
