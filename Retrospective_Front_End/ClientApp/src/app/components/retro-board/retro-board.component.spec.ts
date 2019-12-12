import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetroBoardComponent} from './retro-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RetroColumn} from '../../../models/RetroColumn';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [RetroBoardComponent]
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
    component.retrospective = {
      id: 0,
      title: 'Cool board',
      description: 'Wow',
      retroColumns: []
    };
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
    const column: RetroColumn = {
      id: 0,
      title: 'TestColumn',
      cards: []
    };

    component.retrospective = {
      id: 0,
      title: 'Cool board',
      description: 'Wow',
      retroColumns: [column]
    };

    fixture.detectChanges();

    component.addCard(column);

    const testColumn = component.retrospective.retroColumns[0];

    expect(testColumn.cards.length > 0).toBe(true);
    expect(testColumn.cards.length === 0).toBe(false);

    const card = testColumn.cards[0];

    expect(card).toBeTruthy();
    expect(card.content).toBe('TestCard');
  });

  it('should enable editing', () => {
    const column: RetroColumn = {
      id: 0,
      title: 'TestColumn',
      cards: []
    };

    component.retrospective = {
      id: 0,
      title: 'Cool board',
      description: 'Wow',
      retroColumns: [column]
    };

    fixture.detectChanges();

    let enabled: boolean = component.hasEnabledEditing(column);

    expect(enabled).toBe(false);

    component.enableEditing(true, column);

    enabled = component.hasEnabledEditing(column);

    expect(enabled).toBe(true);
  });
});
