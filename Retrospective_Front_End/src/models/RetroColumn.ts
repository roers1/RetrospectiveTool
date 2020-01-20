import {RetroCard} from './RetroCard';
import {BaseItem} from './BaseItem';
import {RetroFamily} from './RetroFamily';

export class RetroColumn {
    // @ts-ignore
    constructor(
        public id: number,
        public title: string,
        public retroCards: RetroCard[],
        public retroItems: BaseItem[],
        public retroFamilies: RetroFamily[],
        public retrospectiveId: number
    ) {

    }
}
