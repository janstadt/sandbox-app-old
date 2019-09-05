export class SurescriptsUser {
    id: number;
    firstName: string;
    lastName: string;
    public constructor(init?: Partial<SurescriptsUser>) {
        Object.assign(this, init);
    }
}
