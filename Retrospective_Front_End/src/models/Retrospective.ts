import {RetroColumn} from './RetroColumn';

export class Retrospective {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public retroColumns: RetroColumn[],
        public retroUserId: string
    ) {
    }

    addRetroColumn(column: RetroColumn) {
        this.retroColumns.push(column);
    }

    removeRetroColumn(columnId: number) {
        this.retroColumns.filter(rc => rc.id !== columnId);
    }
}


