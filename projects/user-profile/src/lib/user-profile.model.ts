import { SurescriptsUser } from './user.model';
export class SurescriptsUserProfile {
    user: SurescriptsUser;
    environment: string;
    baseUrl: string;
    public constructor(init?: Partial<SurescriptsUserProfile>) {
        Object.assign(this, init);
    }
}
