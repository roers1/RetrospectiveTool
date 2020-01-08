import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroBoardComponent } from './retro-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RetroColumn } from '../../../models/RetroColumn';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Retrospective } from '../../../models/Retrospective';
import { RetroCardService } from '../../services/retro-card.service';
import { RetroCard } from '../../../models/RetroCard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatIconModule, MatSnackBar, MatTooltipModule, MatExpansionModule, MatInputModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material';
import { RetroColumnService } from '../../services/retro-column.service';
import { of } from 'rxjs';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;
  let removeColumnSpy;
  let createColumnSpy;
  let updateColumnSpy;
  let addCardSpy;
  let createBoardSpy;
  let updateRetroCard;
  let deleteRetroCardSpy;
  const mockCard = new RetroCard(-1, 'this is card content', 0, 0, 0, 0, 0);
  const mockColumn = new RetroColumn(-1, 'test', [], -1);

  beforeEach(async(() => {
    const retrospectiveService = jasmine.createSpyObj('RetrospectiveService', ['createRetrospective']);
    const retroColumnService = jasmine.createSpyObj('RetroColumnService', ['removeColumn', 'addColumn', 'createColumn', 'updateColumn']);
    const retroCardService = jasmine.createSpyObj('RetroCardService', ['createCard', 'updateRetroCard', 'deleteRetroCard']);

    removeColumnSpy = retroColumnService.removeColumn.and.returnValue(of());
    deleteRetroCardSpy = retroCardService.deleteRetroCard.and.returnValue(of());
    createColumnSpy = retroColumnService.createColumn.and.returnValue(of(mockColumn));
    updateColumnSpy = retroColumnService.updateColumn.and.returnValue(of());
    addCardSpy = retroCardService.createCard.and.returnValue(of(mockCard));
    updateRetroCard = retroCardService.updateRetroCard.and.returnValue(of());

    createBoardSpy = retrospectiveService.createRetrospective.and.returnValue(of());

    TestBed.configureTestingModule({
      imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule,
        MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, MatTooltipModule,
        HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule, BrowserAnimationsModule,
        MatInputModule, MatExpansionModule],
      declarations: [RetroBoardComponent],
      providers: [MatDialog, MatSnackBar,
        { provide: RetroColumnService, useValue: retroColumnService },
        { provide: RetroCardService, useValue: retroCardService }]
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
      []
    );

    const retrospectiveId: number = component.retrospective.id;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
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
      []
    );

    const retrospectiveId: number = component.retrospective.id;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
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

  xit('should trigger variable when add button is clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.clickable_element');

    button.click();

    expect(component.enable).toEqual(true);
  });


  it('should return to homepage on clean retroBoard', () => {
    component.retrospective = new Retrospective(1000, 'title', 'description', []);

    const retrospectiveId = component.retrospective.id;

    component.retrospective.addRetroColumn(new RetroColumn(11, 'rc1', [], retrospectiveId));
    component.retrospective.addRetroColumn(new RetroColumn(22, 'rc2', [], retrospectiveId));

    component.cleanRetroBoard();
    fixture.detectChanges();

    const router = TestBed.get(Router);
    expect(router.url).toBe('/');
  });

  it('Should edit title when edit title is called', () => {
    component.retrospective = new Retrospective(
      0,
      'Cool board',
      'Wow',
      []
    );

    const retrospectiveId: number = component.retrospective.id;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
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
      []
    );

    const retrospectiveId = component.retrospective.id;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      [],
      retrospectiveId
    );

    component.retrospective.addRetroColumn(column);

    fixture.detectChanges();

    component.deleteColumn(column);

    expect(component.retrospective.retroColumns.length === 0).toBe(true);
  });

  it('should re-assign the positions of a column', () => {
    component.retrospective = new Retrospective(1, 'retrospective1', 'des', []);

    const retrospectiveId = component.retrospective.id;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      [
        new RetroCard(0, 'RetroCard 1', 1, 0, 0, 0, 0),
        new RetroCard(1, 'RetroCard 2', 2, 0, 0, 0, 0),
        new RetroCard(2, 'RetroCard 3', 0, 0, 0, 0, 0)
      ],
      retrospectiveId
    );

    component.updatePositions(column.retroItems);

    expect(column.retroItems.length === 3);
    expect(column.retroItems[0].position === 0);
    expect(column.retroItems[1].position === 1);
    expect(column.retroItems[2].position === 2);
  });

  it('should update content of a retrocard', () => {
    component.retrospective = new Retrospective(
      1,
      'retrospective1', 'des', []);

    const retrospective = component.retrospective;

    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      [],
      retrospective.id
    );

    const card: RetroCard = new RetroCard(0, 'RetroCard 1', 1, column.id,0,0, 0);

    component.addColumn(column);
    retrospective.retroColumns[0].retroItems.push(card);

    const retroColumn = retrospective.retroColumns[0];
    var retroCard = retrospective.retroColumns[0].retroItems[0] as RetroCard;

    fixture.detectChanges();

    const newContent = 'New Content';

    component.updateContent(retroCard ,newContent);

    expect(retroCard.content).toEqual(newContent);
  });

  it('should remove a retrocard from a retrocolumn', () => {
    const retroCard = new RetroCard(
      111,
      'cardtitle',
      0,
      11,
      0, 0, 0
    )
    const retroColumn = new RetroColumn(
      11,
      'title',
      [retroCard],
      1
    )
    const retrospective = new Retrospective(
      1,
      'title',
      'description',
      [retroColumn]
    )

    component.retrospective = retrospective
    
    fixture.detectChanges();

    expect(retroColumn.retroItems.length).toEqual(1);
    component.deleteCard(retroCard)
    expect(retroColumn.retroItems.length).toEqual(0);
  });

  it('card should have 2 upvotes & 1 downvote', () => {
    const retroCard = new RetroCard(1, 'RetroCard 2', 2, 0, 0, 0, 0)
    const column: RetroColumn = new RetroColumn(
      0,
      'TestColumn',
      [
        new RetroCard(0, 'RetroCard 1', 1, 0, 0, 0, 0),
        retroCard,
        new RetroCard(2, 'RetroCard 3', 0, 0, 0, 0, 0)
      ],
      -1
    );

    component.voteUp(retroCard)
    component.voteUp(retroCard)
    component.voteDown(retroCard)

    var updatedCard = column.retroItems[1] as RetroCard
    
    expect(updatedCard.upVotes === 2)
    expect(updatedCard.downVotes === 1)
  })
});
