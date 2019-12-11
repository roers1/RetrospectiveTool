import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroColumn} from '../../../models/RetroColumn';
import {RetroCard} from '../../../models/RetroCard';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})
export class RetroBoardComponent implements OnInit {

  elements = [];

  retroColumns: RetroColumn[] = [
    {
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
    }
  ];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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

  constructor() {
  }

  ngOnInit() {
  }
}
