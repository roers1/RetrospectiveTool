import {RetroColumn} from './retroColumn';

export class Retrospective {
  id: number;
  title: string;
  description: string;
  retroColumns: RetroColumn[];
}
