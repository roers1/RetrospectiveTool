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
  retrospective: Retrospective = {
    id: 0,
    title: 'Nieuw bord',
    description: 'Plaats hier een beschrijving.',
    retroColumns: [{
      title: 'Todo',
      cards: [
        {
          id: 0,
          content: 'Get to work',
          position: 0
        },
        {
          id: 1,
          content: 'Pick up groceries',
          position: 1
        },
        {
          id: 2,
          content: 'Go to sleep...',
          position: 2
        }
      ]
    },
      {
        title: 'Doing',
        cards: [
          {
            id: 3,
            content: 'Nothing',
            position: 0
          },
          {
            id: 4,
            content: 'Item',
            position: 1
          },
          {
            id: 5,
            content: 'Item',
            position: 2
          }
        ]
      },
      {
        title: 'Done',
        cards: [
          {
            id: 6,
            content: 'Cooking',
            position: 0
          },
          {
            id: 7,
            content: 'Grocery shopping',
            position: 1
          },
          {
            id: 8,
            content: 'Cleaning',
            position: 2
          }
        ]
      }]
  };

  cardGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
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
      {title: title, cards: []}
    );

    // TODO: ADD SERVICE!
  }

  addCard(column: RetroColumn, content) {
    column.cards.push({content: content, id: 0, position: (column.cards.length - 1)});

    // TODO ADD SERVICE!
  }

  enableEditing(bool: boolean, column: RetroColumn) {
      this.enabledColumn[column.title] = bool;
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
