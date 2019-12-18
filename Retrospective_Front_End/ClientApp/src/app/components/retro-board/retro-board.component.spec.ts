import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroBoardComponent } from './retro-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RetroColumn } from '../../../models/RetroColumn';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Retrospective } from '../../../models/Retrospective';
import { RetroCardService } from '../../services/retro-card.service';
import { RetroCard } from '../../../models/RetroCard';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatButtonModule, MatDialogModule, MatFormField, MatIconModule, MatSnackBar, MatTooltipModule} from '@angular/material';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialog} from '@angular/material';
import {RetroColumnService} from '../../services/retro-column.service';
import {of} from 'rxjs';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;
  let removeColumnSpy;
  let createColumnSpy;
  let updateColumnSpy;
  let addCardSpy;
  let createBoardSpy;
  let mockCard = new RetroCard(-1, 'this is card content', 0);
  let mockColumn = new RetroColumn(-1, 'test', []);

  beforeEach(async(() => {
    const retrospectiveService = jasmine.createSpyObj('RetrospectiveService', ['createRetrospective']);
    const retroColumnService = jasmine.createSpyObj('RetrocolumnService', ['removeColumn', 'addColumn', 'createColumn', 'updateColumn']);
    const retroCardService = jasmine.createSpyObj('RetrocardService', ['createCard']);

    removeColumnSpy = retroColumnService.removeColumn.and.returnValue(of());
    createColumnSpy = retroColumnService.createColumn.and.returnValue(of(mockColumn));
    updateColumnSpy = retroColumnService.updateColumn.and.returnValue(of());
    addCardSpy = retroCardService.createCard.and.returnValue(of(mockCard));

    createBoardSpy = retrospectiveService.createRetrospective.and.returnValue(of());

    TestBed.configureTestingModule({
        imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule,
        MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, MatTooltipModule,
        HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [RetroBoardComponent],
      providers: [MatDialog, MatSnackBar,
        {provide: RetroColumnService, useValue: retroColumnService},
        {provide: RetroCardService, useValue: retroCardService}]
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
      []
    );

    fixture.autoDetectChanges();

    const columnTitle = mockColumn.title;
    component.addColumn(columnTitle);

    let columns = component.retrospective.retroColumns;

    expect(columns.length > 0).toBe(true);

    const column = columns[0];

    expect(column).toBeTruthy();
    expect(column.title).toEqual(columnTitle);
  });

  it('should add card', () => {
    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      []
    );

    component.retrospective = new Retrospective(
      0,
      'Cool board',
      'Wow',
      [column]
    );

    fixture.detectChanges();

    component.cardGroup.get('content').setValue(mockCard.content);
    component.addCard(column);

    const testColumn = component.retrospective.retroColumns[0];

    expect(testColumn.retroCards.length > 0).toBe(true);
    expect(testColumn.retroCards.length === 0).toBe(false);

    const card = testColumn.retroCards[0];

    expect(card).toBeTruthy();
    expect(card.content).toBe(mockCard.content);
  });

  it('should enable editing', () => {
    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      []
    );

    component.retrospective = new Retrospective(
      0,
      'Cool board',
      'Wow',
      [column]
    );

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

  it('should trigger variable when add button is clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');

    button.click();

    expect(component.enable).toEqual(true);
  });


  it('should return to homepage on clean retroBoard', () => {
    component.retrospective = new Retrospective(1000, 'title', 'description', [
      new RetroColumn(11, 'rc1', []),
      new RetroColumn(22, 'rc2', [])
    ]);

    component.cleanRetroBoard();
    fixture.detectChanges();

    let router = TestBed.get(Router);
    expect(router.url).toBe('/');
  });

  it('Should edit title when edit title is called', () => {
    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      []
    );

    component.retrospective = new Retrospective(
      0,
      'Cool board',
      'Wow',
      [column]
    );

    fixture.detectChanges();

    const testTitle = 'newTitle';

    component.updateColumnTitle(column, testTitle);

    expect(column.title).toEqual(testTitle);
  });

  it('should be able to delete column', () => {
    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      []
    );

    component.retrospective = new Retrospective(
      0,
      'Cool board',
      'Wow',
      [column]
    );

    fixture.detectChanges();

    component.deleteColumn(column);

    expect(component.retrospective.retroColumns.length === 0).toBe(true);
  });
});
