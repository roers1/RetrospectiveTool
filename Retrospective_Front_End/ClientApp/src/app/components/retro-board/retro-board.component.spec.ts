import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RetroBoardComponent} from './retro-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Retrospective} from '../../../models/Retrospective';
import {MatButtonModule, MatDialogModule, MatFormField, MatIconModule} from '@angular/material';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialog} from '@angular/material';
import {RetrocolumnService} from '../../retrocolumn.service';
import {RetrocardService} from '../../retrocard.service';
import {RetroCard} from '../../../models/RetroCard';
import {of} from 'rxjs';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;
  let removeColumnSpy;
  let addCardSpy;
  let mockCard = new RetroCard(-1, 'this is card content', 0);

  beforeEach(async(() => {
    const retrocolumnService = jasmine.createSpyObj('RetrocolumnService', ['removeColumn', 'addColumn']);
    const retrocartService = jasmine.createSpyObj('RetrocardService', ['createCard'])

    removeColumnSpy = retrocolumnService.removeColumn.and.returnValue(of());
    addCardSpy = retrocartService.createCard.and.returnValue(of(mockCard))

    TestBed.configureTestingModule({
      // tslint:disable-next-line:max-line-length
      imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule],
      declarations: [RetroBoardComponent],
      providers: [MatDialog,
        {provide: RetrocolumnService, useValue: retrocolumnService},
        {provide: RetrocardService, useValue: retrocartService}]
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
    fixture.detectChanges();

    component.addColumn('TestColumn');

    const columns = component.retrospective.retroColumns;

    expect(columns.length > 0).toBe(true);
    expect(columns.length === 0).toBe(false);


    const column = columns[0];

    expect(column).toBeTruthy();
    expect(column.title).toBe('TestColumn');
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

    component.cardGroup.get('content').setValue(mockCard.content)
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

  it('should clean Retro Board', () => {
    component.retrospective = new Retrospective(1000, 'title', 'description', [
      new RetroColumn(11, 'rc1', []),
      new RetroColumn(22, 'rc2', [])
    ]);

    fixture.detectChanges();

    component.cleanRetroBoard();

    expect(component.retrospective).toBe(null);
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
    const testTitle = 'new';
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
  it('Should trigger variable when add button is clicked should enable open menu', () => {
    component.enable = false;
    const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');
    button.click();
    expect(component.enable).toEqual(true);
  });
});
