import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RetroCard} from '../../../models/RetroCard';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {MatMenuModule} from '@angular/material/menu';
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
  editedContent = {};
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

  emptyColumn(column: RetroColumn) {
    if (confirm('Weet je zeker dat je alle kaarten in deze kolom wilt verwijderen?')) {
      column.cards = [];
    }
    // TODO: ADD SERVICE!
  }

  addCard(column: RetroColumn) {
    const value = this.cardGroup.value;

    column.cards.push(
      new RetroCard(column.cards.length, value.content, column.cards.length)
    );

    // TODO ADD SERVICE!
  }

  deleteColumn(givenColumn: RetroColumn) {

    if (confirm('Weet je zeker dat je deze kolom wilt verwijderen?')) {
      const index = this.retrospective.retroColumns.indexOf(givenColumn);
      this.retrospective.retroColumns.splice(index, 1);
    }
    // TODO ADD SERVICE!
  }

  deleteCard(givenCard: RetroCard) {

    if (confirm('Weet je zeker dat je deze kaart wilt verwijderen?')) {
      this.retrospective.retroColumns.forEach(column => {
        column.cards.forEach(card => {
          if (card.id === givenCard.id) {
            const index = column.cards.indexOf(givenCard);
            column.cards.splice(index, 1);
          }
        });

      });
    }
    // TODO ADD SERVICE!
  }

  updateContent(card: RetroCard, content) {
    card.content = content;
    this.enableContentEditing(false, card);
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
    this.enabledColumn = {};
    this.enabledColumn[column.id] = bool;
  }

  hasEnabledEditing(column: RetroColumn) {
    if (!this.enabledColumn[column.id]) {
      this.enabledColumn[column.id] = false;
    }

    return this.enabledColumn[column.id];
  }

  constructor() {
  }

  ngOnInit() {
  }
}
