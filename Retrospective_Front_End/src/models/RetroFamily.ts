import {BaseItem} from './BaseItem';
import {RetroCard} from './RetroCard';

export class RetroFamily extends BaseItem {

    constructor(
        public id: number,
        public content: string,
        public position: number,
        public retroColumnId: number,
        public retroCards: RetroCard[]
    ) {
        super(id, content, position, retroColumnId);
    }
}


