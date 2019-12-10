import { Retrospective } from './retrospective';
import { Participant } from './Participant';

export class Facilitator {
  id: number;
  name: string;
  retrospective: Retrospective;
  participants: Participant[];
}
