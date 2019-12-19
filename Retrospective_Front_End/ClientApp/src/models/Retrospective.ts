import {RetroColumn} from './retroColumn';

export class Retrospective {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public retroColumns: RetroColumn[]
  ) {
  }

  addRetroColumn(column: RetroColumn) {
    this.retroColumns.push(column);
  }

  removeRetroColumn(columnId: number) {
    this.retroColumns.filter(rc => rc.id !== columnId);
  }
}


