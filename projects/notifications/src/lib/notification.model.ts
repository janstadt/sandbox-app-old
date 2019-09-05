import { SurescriptsNotificationStatus } from './notification-status.enum';
export class SurescriptsNotification {
    title: string;
    summary: string;
    id: string;
    status: SurescriptsNotificationStatus;
    postedDate: Date;
    readablePostedDate: string;
    public constructor(init?: Partial<SurescriptsNotification>) {
        Object.assign(this, init);
        this.postedDate = new Date(init.postedDate);
        const difference = new Date().getTime() - this.postedDate.getTime();
        if (difference <= 3600000) {
            const minutes = Math.round(((difference % 86400000) % 3600000) / 60000);
            if (minutes < 2) {
                this.readablePostedDate = 'Moments ago';
            } else {
                this.readablePostedDate = `${minutes} minutes ago`;
            }
        } else if (difference <= 86400000) {
            const hours = Math.floor((difference % 86400000) / 3600000);
            if (hours < 2) {
                this.readablePostedDate = `${hours} hour ago`;
            } else {
                this.readablePostedDate = `${hours} hours ago`;
            }
        } else if (difference <= 604800000) {
            const days = Math.floor(difference / 86400000);
            if (days < 2) {
                this.readablePostedDate = `${days} day ago`;
            } else {
                this.readablePostedDate = `${days} days ago`;
            }
        }
    }
}
