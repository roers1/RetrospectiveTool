import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RetroBoardComponent} from './retro-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE} from '@angular/forms';
import {Retrospective} from '../../../models/Retrospective';
import {MatButtonModule, MatDialogModule, MatFormField, MatIconModule} from '@angular/material';
import { BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule} from '@angular/material';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RetrospectiveService } from '../../retrospective.service';
import { RetrocolumnService } from '../../retrocolumn.service';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;
  let removeColumnSpy;
  let createBoardSpy;

  beforeEach(async(() => {
    const retrospectiveService = jasmine.createSpyObj('RetrospectiveService', ['createRetrospective']);

    createBoardSpy = retrospectiveService.createRetrospective.and.returnValue(of());

    TestBed.configureTestingModule({
      // tslint:disable-next-line:max-line-length
      imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule],
      declarations: [RetroBoardComponent],
      providers: [MatDialog, { provide: RetrospectiveService, useValue: retrospectiveService }]
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

    component.addCard(column);

    const testColumn = component.retrospective.retroColumns[0];

    expect(testColumn.retroCards.length > 0).toBe(true);
    expect(testColumn.retroCards.length === 0).toBe(false);

    const card = testColumn.retroCards[0];

    expect(card).toBeTruthy();
    expect(card.content).toBe('TestCard');
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

  // TODO: 
  it('should clean Retro Board & create a new Retro Board', () => {
    component.retrospective = new Retrospective(1000, 'title', 'description', [
      new RetroColumn(11, "rc1", []),
      new RetroColumn(22, "rc2", [])
    ]);

    component.cleanRetroBoard();

    fixture.detectChanges();

    let confirmModal = fixture.debugElement.nativeElement.querySelector('#confirm-dialogue');

    let wipeBtn = fixture.debugElement.nativeElement.querySelector('#wipe_btn');
    wipeBtn.click();

    let okBtn = fixture.debugElement.nativeElement.querySelector('.TLbtn btn-size-small btn-color-primary');
    okBtn.click();

    expect(component.retrospective.retroColumns.length === 0).toBe(true);
  });

  // it('should trigger variable when add  button is clicked should close menu', () => {
  //   const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');
  //   const button2 = fixture.debugElement.nativeElement.querySelector('.clickable_element_close');
  //   console.log(button);
  //   console.log(button2);
  //   button.click();
  //   button2.click();
  //   expect(component.enable).toEqual(false);
  // });
  //
  // it('should trigger variable when close button is clicked should close menu', () => {
  //   const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');
  //
  //   button.click();
  //
  //   const button2 = fixture.debugElement.nativeElement.querySelector('.clickable_element_close_alt');
  //
  //   button2.click();
  //
  //   expect(component.enable).toEqual(false);
  // });


});
