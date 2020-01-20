import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RetroBoardComponent} from './retro-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Retrospective} from '../../../models/Retrospective';
import {RetroCardService} from '../../services/retrospective/retro-card.service';
import {RetroCard} from '../../../models/RetroCard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {RetroColumnService} from '../../services/retrospective/retro-column.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {RetrospectiveService} from 'src/app/services/retrospective/retrospective.service';
import {ErrorComponent} from '../error/error.component';

describe('RetroBoardComponent', () => {
    let component: RetroBoardComponent;
    let fixture: ComponentFixture<RetroBoardComponent>;
    let removeColumnSpy;
    let createColumnSpy;
    let updateColumnSpy;
    let createBoardSpy;
    let createCardSpy;

    const mockCard = new RetroCard(-1, 'this is card content', 0, 0, 0, 0, -1);
    const mockColumn = new RetroColumn(-1, 'test', [], [], [], -1);

    beforeEach(async(() => {
        const retrospectiveService = jasmine.createSpyObj('RetrospectiveService', ['createRetrospective']);
        // tslint:disable-next-line:max-line-length
        const retroColumnService = jasmine.createSpyObj('RetroColumnService', ['removeColumn', 'addColumn', 'createColumn', 'updateColumn']);
        const retroCardService = jasmine.createSpyObj('RetroCardService', ['createCard', 'updateRetroCard', 'deleteRetroCard']);

        removeColumnSpy = retroColumnService.removeColumn.and.returnValue(of());
        createColumnSpy = retroColumnService.createColumn.and.returnValue(of(mockColumn));
        updateColumnSpy = retroColumnService.updateColumn.and.returnValue(of());

        createBoardSpy = retrospectiveService.createRetrospective.and.returnValue(of());

        createCardSpy = retroCardService.createCard.and.returnValue(of(mockCard));

        TestBed.configureTestingModule({
            imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule,
                MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, MatTooltipModule,
                // tslint:disable-next-line:max-line-length
                HttpClientTestingModule, RouterModule, RouterTestingModule.withRoutes([{
                    path: 'error',
                    component: ErrorComponent
                }]), MatDialogModule, BrowserAnimationsModule,
                MatInputModule, MatExpansionModule],
            declarations: [RetroBoardComponent, ErrorComponent],
            providers: [MatDialog, MatSnackBar,
                {provide: RetroColumnService, useValue: retroColumnService},
                {provide: RetroCardService, useValue: retroCardService}],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetroBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add column', () => {
        component.retrospective = new Retrospective(
            0,
            'Cool board',
            'Wow',
            [],
            null
        );

        fixture.detectChanges();

        const columnTitle = mockColumn.title;
        component.addColumn(columnTitle);

        const columns = component.retrospective.retroColumns;

        expect(columns.length > 0).toBe(true);

        const column = columns[0];

        expect(column).toBeTruthy();
        expect(column.title).toEqual(columnTitle);
    });

    it('should add card', () => {
        component.retrospective = new Retrospective(
            0,
            'Cool board',
            'Wow',
            [],
            null
        );

        const retrospectiveId: number = component.retrospective.id;

        const column: RetroColumn = new RetroColumn(
            0,
            'TestColumn',
            [],
            [],
            [],
            retrospectiveId
        );

        component.retrospective.addRetroColumn(column);

        fixture.detectChanges();

        component.cardGroup.get('content').setValue(mockCard.content);
        component.addCard(column);

        const testColumn = component.retrospective.retroColumns[0];

        expect(testColumn.retroItems.length > 0).toBe(true);
        expect(testColumn.retroItems.length === 0).toBe(false);

        const card = testColumn.retroItems[0];

        expect(card).toBeTruthy();
        expect(card.content).toBe(mockCard.content);
    });

    it('should enable editing', () => {
        component.retrospective = new Retrospective(
            0,
            'Cool board',
            'Wow',
            [],
            null
        );

        const retrospectiveId: number = component.retrospective.id;

        const column: RetroColumn = new RetroColumn(
            0,
            'TestColumn',
            [],
            [],
            [],
            retrospectiveId
        );

        component.retrospective.addRetroColumn(column);

        fixture.detectChanges();

        let enabled: boolean = component.hasEnabledEditing(column);

        expect(enabled).toBe(false);

        component.enableEditing(true, column);

        enabled = component.hasEnabledEditing(column);

        expect(enabled).toBe(true);
    });

    it('should instantiate', () => {
        expect(component).toBeDefined();
    });

    // xit('should trigger variable when add button is clicked', () => {
    //   const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');

    //   button.click();

    //   expect(component.enable).toEqual(true);
    // });


    // it('should return to homepage on clean retroBoard', () => {
    //   component.retrospective = new Retrospective(1000, 'title', 'description', []);

    //   const retrospectiveId = component.retrospective.id;

    //   component.retrospective.addRetroColumn(new RetroColumn(11, 'rc1', [], retrospectiveId));
    //   component.retrospective.addRetroColumn(new RetroColumn(22, 'rc2', [], retrospectiveId));

    //   component.cleanRetroBoard();
    //   fixture.detectChanges();

    //   const router = TestBed.get(Router);
    //   expect(router.url).toBe('/');
    // });

    it('Should edit title when edit title is called', () => {
        component.retrospective = new Retrospective(
            0,
            'Cool board',
            'Wow',
            [],
            null
        );

        const retrospectiveId: number = component.retrospective.id;

        const column: RetroColumn = new RetroColumn(
            0,
            'TestColumn',
            [],
            [],
            [],
            retrospectiveId
        );

        fixture.detectChanges();

        const testTitle = 'newTitle';

        component.updateColumnTitle(column, testTitle);

        expect(column.title).toEqual(testTitle);
    });

    it('should be able to delete column', () => {
        component.retrospective = new Retrospective(
            0,
            'Cool board',
            'Wow',
            [],
            null
        );

        const retrospectiveId = component.retrospective.id;

        const column: RetroColumn = new RetroColumn(
            0,
            'TestColumn',
            [],
            [],
            [],
            retrospectiveId
        );

        component.retrospective.addRetroColumn(column);

        fixture.detectChanges();

        component.deleteColumn(column);

        expect(component.retrospective.retroColumns.length === 0).toBe(true);
    });

    it('should re-assign the positions of a column', () => {
        component.retrospective = new Retrospective(1, 'retrospective1', 'des', [], null);

        const retrospectiveId = component.retrospective.id;

        const column: RetroColumn = new RetroColumn(
            0,
            'TestColumn',
            [],
            [
                new RetroCard(0, 'RetroCard 1', 1, 0, 0, 0, -1),
                new RetroCard(1, 'RetroCard 2', 2, 0, 0, 0, -1),
                new RetroCard(2, 'RetroCard 3', 0, 0, 0, 0, -1)
            ],
            [],
            retrospectiveId
        );

        component.updatePositions(column.retroItems, column);

        expect(column.retroItems.length === 3);
        expect(column.retroItems[0].position === 0);
        expect(column.retroItems[1].position === 1);
        expect(column.retroItems[2].position === 2);
    });

    it('should clean retroboard if CleanRetroBoard is called', () => {
        const retrospectiveId = 1;
        const retroColumnId = 2;

        component.retrospective = new Retrospective(
            retrospectiveId,
            'retroTitle',
            'retroDescription',
            [
                new RetroColumn(retroColumnId, 'retroColumnTitle',
                    [
                        new RetroCard(1, 'card', 1, retroColumnId, 0, 0, 0)
                    ], [], [], retrospectiveId
                )
            ],
            null
        );

        fixture.detectChanges();

        component.cleanRetroBoard();

        const retroCardsLength = component.retrospective.retroColumns[0].retroItems.length;

        expect(retroCardsLength).toEqual(0);
    });
});
