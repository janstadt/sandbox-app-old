import { SurescriptsNotification } from './notification.model';

export class SurescriptsNotifications {
    baseUrl: string;
    items: Array<SurescriptsNotification>;
    total: number;
    public constructor(init?: Partial<SurescriptsNotifications>) {
        Object.assign(this, init);
        this.items = init.items.map(x => new SurescriptsNotification(x));
    }
}
