import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';

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
          content: 'Get to work'
        },
        {
          id: 1,
          content: 'Pick up groceries'
        },
        {
          id: 2,
          content: 'Go to sleep...'
        }
      ]
    },
      {
        title: 'Done',
        cards: [
          {
            id: 3,
            content: 'Broeder...'
          },
          {
            id: 4,
            content: 'Nee'
          },
          {
            id: 5,
            content: 'Dank u'
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

  }


  constructor() {
  }

  ngOnInit() {
  }

  get diagnostic() {
    return JSON.stringify(this.retrospective.retroColumns[0].cards);
  }
}
