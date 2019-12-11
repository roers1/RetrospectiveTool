import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})
export class RetroBoardComponent implements OnInit {

  elements = [];

  retrospective: Retrospective = {
    id: 0,
    title: 'Hell yeah',
    description: 'idc',
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
        title: 'Done',
        cards: [
          {
            id: 3,
            content: 'Broeder...',
            position: 0
          },
          {
            id: 4,
            content: 'Nee',
            position: 1
          },
          {
            id: 5,
            content: 'Dank u',
            position: 2
          }
        ]
      }]
  };


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


  constructor() {
  }

  ngOnInit() {
  }
}
