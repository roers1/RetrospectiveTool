import {RetroColumn} from './retroColumn';

export class Retrospective {
 

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public retroColumns: RetroColumn[]
  ) { };

  addRetroColumn(retrocolumn: RetroColumn) {
    this.retroColumns.push(retrocolumn);
  }

  removeRetroColumn(retrocolumnId: number) {
    if (retrocolumnId => 0) {
      this.retroColumns.filter(rc => rc.id != retrocolumnId);
    }
  }
}


