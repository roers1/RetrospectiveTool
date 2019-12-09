import { Retrospective } from "./retrospective";
import { Participant } from "./participant";

export class Facilitator {
  id: Number;
  name: String;
  retrospective: Retrospective;
  participants: Participant[];
}
