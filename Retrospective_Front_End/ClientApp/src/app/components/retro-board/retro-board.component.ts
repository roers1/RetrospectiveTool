import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.css']
})
export class RetroBoardComponent implements OnInit {
  enable = false;
  elements = [];
  enabledColumn = {};
  editedContent = {};
  retrospective: Retrospective = {
    id: 0,
    title: 'Nieuw bord',
    description: 'Plaats hier een beschrijving.',
    retroColumns: [{
      id: 0,
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
        id: 0,
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
        id: 0,
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
      {id: 0, title: title, cards: []}
    );

    console.log("test")
    // TODO: ADD SERVICE!
  }

  emptyColumn(column: RetroColumn) {
    if(confirm("Weet je zeker dat je alle kaarten in deze kolom wilt verwijderen?")) {
      column.cards = [];
    }
    // TODO: ADD SERVICE!
  }

  addCard(column: RetroColumn, content) {
    column.cards.push({content: content, id: 0, position: (column.cards.length - 1)});

    // TODO ADD SERVICE!
  }
  deleteColumn(givenColumn: RetroColumn) {

    if(confirm("Weet je zeker dat je deze kolom wilt verwijderen?")) {
      let index = this.retrospective.retroColumns.indexOf(givenColumn);
      this.retrospective.retroColumns.splice(index, 1);
    }
    // TODO ADD SERVICE!
  }
  deleteCard(givenCard: RetroCard) {

    if(confirm("Weet je zeker dat je deze kaart wilt verwijderen?")) {
      this.retrospective.retroColumns.forEach(column => {
        column.cards.forEach(card => {
          if(card.id == givenCard.id) {
            let index = column.cards.indexOf(givenCard);
            column.cards.splice(index, 1)
          }
        });

      });
    }
    // TODO ADD SERVICE!
  }

  updateContent(card: RetroCard, content) {
    card.content = content;
    this.enableContentEditing(false, card)
    // TODO ADD SERVICE!
  }

  enableContentEditing(bool: boolean, card: RetroCard) {
    this.editedContent[card.id] = bool;
  }

  hasEnabledContentEditing(card: RetroCard) {
    if (!this.editedContent[card.id]) {
      this.editedContent[card.id] = false;
    }

    return this.editedContent[card.id];
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
