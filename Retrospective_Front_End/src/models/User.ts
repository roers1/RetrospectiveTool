export class User {

    constructor(
        public id: number,
        public token: string,
        public expireTo: Date
    ) {
    }
}
