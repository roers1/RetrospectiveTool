import {Component, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {RetroCardService} from 'src/app/services/retrospective/retro-card.service';
import {RetroCard} from 'src/models/RetroCard';
import {MatDialog, MatSnackBar} from '@angular/material';
import {dictionary} from '../../../helpers/message-constants';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnDestroy {
    @Input() card: RetroCard;

    contentEditMode = false;
    isDestroyed = false;

    TextFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
    ]);

    dict = dictionary;
    cardGroup: FormGroup = new FormGroup({
        content: new FormControl('', [Validators.required])
    });

    constructor(
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        public retroCardService: RetroCardService,
        public vcRef: ViewContainerRef) {
    }

    enableContentEditing(bool: boolean) {
        this.contentEditMode = bool;
    }

    updateContent(content) {
        this.card.content = content;
        this.contentEditMode = false;

        this.retroCardService.updateRetroCard(this.card)
            .subscribe(_ => {
            });
    }

    deleteCardDialog() {
        this.openDialog(this.dict.RETROBOARD_DELETE_CARD_NOTI, () => {
            this.deleteCard();
            this.openSnackBar(this.dict.SNACKBAR_SUCCES_DELETE, this.dict.SNACKBAR_OK);
        });
    }

    deleteCard() {
        this.isDestroyed = true;
        this.retroCardService.deleteRetroCard(this.card).subscribe(_ => {
        });
        this.ngOnDestroy();
    }

    voteUp() {
        if (this.card.upVotes == null) {
            this.card.upVotes = 0;
        }
        this.card.upVotes++;

        this.retroCardService.updateRetroCard(this.card).subscribe(_ => {
        });
    }

    ngOnDestroy(): void {
    }

    voteDown() {
        if (this.card.downVotes == null) {
            this.card.downVotes = 0;
        }
        this.card.downVotes++;

        this.retroCardService.updateRetroCard(this.card).subscribe(_ => {
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

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
