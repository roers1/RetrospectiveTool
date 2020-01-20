import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatDialog,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatTooltipModule
} from '@angular/material';
import {RetroCardService} from '../../services/retrospective/retro-card.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import {CardItemComponent} from './card-item.component';
import {RetroCard} from 'src/models/RetroCard';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CardItemComponent', () => {
    let component: CardItemComponent;
    let fixture: ComponentFixture<CardItemComponent>;
    let addCardSpy;
    let updateRetroCardSpy;
    let deleteRetroCardSpy;

    const mockCard = new RetroCard(-1, 'this is card content', 0, 0, 0, 0, -1);

    beforeEach(async(() => {
        const retroCardService = jasmine.createSpyObj('RetroCardService', ['createCard', 'updateRetroCard', 'deleteRetroCard']);

        deleteRetroCardSpy = retroCardService.deleteRetroCard.and.returnValue(of());
        addCardSpy = retroCardService.createCard.and.returnValue(of(mockCard));
        updateRetroCardSpy = retroCardService.updateRetroCard.and.returnValue(of());

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MatButtonModule,
                MatIconModule, BrowserDynamicTestingModule, MatFormFieldModule, MatTooltipModule,
                HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule,
                MatInputModule, MatExpansionModule],
            declarations: [CardItemComponent],
            providers: [MatDialog, MatSnackBar,
                {provide: RetroCardService, useValue: retroCardService}],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardItemComponent);
        component = fixture.componentInstance;
        component.card = mockCard;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update content of a retrocard', () => {
        const newContent = 'New Content';

        component.updateContent(newContent);

        expect(component.card.content).toEqual(newContent);
    });

    it('should remove a retrocard from a retrocolumn', () => {
        component.deleteCard();
        expect(component.isDestroyed).toBeTruthy();
    });

    it('card should have 2 upvotes & 1 downvote', () => {
        component.voteUp();
        component.voteUp();
        component.voteDown();

        expect(component.card.upVotes === 2);
        expect(component.card.downVotes === 1);
    });
});
