import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})

export class RetroBoardComponent implements OnInit {
  enable = false;
  elements = [];
  enabledColumn = {};
  retrospective: Retrospective = new Retrospective(0, 'Title', 'Description', [
    new RetroColumn(0, 'Todo', [
      new RetroCard(0, 'Nothing', 0),
    ])
  ]);

  cardGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
  listGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  drop(event: CdkDragDrop<RetroCard[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getColumnNames(any) {
    this.elements.push(any);

    return this.elements;
  }


  // addCard()

  addColumn(title) {
    this.retrospective.retroColumns.push(
      new RetroColumn(this.retrospective.retroColumns.length, title, [])
    );

    // TODO: ADD SERVICE!
  }

  addCard(column: RetroColumn) {
    const value = this.cardGroup.value;

    column.cards.push(
      new RetroCard(column.cards.length, value.content, column.cards.length)
    );

    // TODO ADD SERVICE!
  }

  enableEditing(bool: boolean, column: RetroColumn) {
    this.enabledColumn = {};
    this.enabledColumn[column.id] = bool;
  }

  hasEnabledEditing(column: RetroColumn) {
    if (!this.enabledColumn[column.title]) {
      this.enabledColumn[column.title] = false;
    }

    return this.enabledColumn[column.title];
  }

  constructor() {
  }

  ngOnInit() {
  }
}
