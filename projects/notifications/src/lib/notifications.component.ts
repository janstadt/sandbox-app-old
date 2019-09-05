import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurescriptsNotifications } from './notifications.model';
import { tap, exhaustMap, startWith, switchMap, finalize, dematerialize, materialize } from 'rxjs/operators';
import { faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SurescriptsNotification } from './notification.model';
import { SurescriptsNotificationStatus } from './notification-status.enum';
import { Observable, interval, BehaviorSubject, NEVER } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'surescripts-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  faBell: IconDefinition = faBell;

  @Input()
  ssoBaseUrl: string;
  notifications: SurescriptsNotifications;
  unreadCount = 0;
  SurescriptsNotificationStatus = SurescriptsNotificationStatus;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (!this.ssoBaseUrl) {
      throw new Error('"ssoBaseUrl" is required.');
    }
    this.ssoBaseUrl = this.ssoBaseUrl.replace(/\/+$/, '');

    const pauser = new BehaviorSubject(false);

    // poll every hour.
    const source = interval(3600000).pipe(
      startWith(0),
      exhaustMap(() => this.poll())
    );

    pauser.pipe(switchMap(
      paused => paused ? NEVER : source.pipe(materialize())
    ), dematerialize()).subscribe();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // pause the poll and make a call. once finished, turn the poll on again and unsubscribe
        pauser.next(true);
        this.poll().pipe(finalize(() => {
          pauser.next(false);
        })).subscribe().unsubscribe();
      }
    });
  }

  private poll(): Observable<SurescriptsNotifications> {
    return this.http.get<SurescriptsNotifications>(`${this.ssoBaseUrl}/app/v1/user/notifications`,
    { withCredentials: true }).pipe(tap((resp: SurescriptsNotifications) => {
      this.notifications = new SurescriptsNotifications(resp);
      this.unreadCount = this.notifications.items.filter(x => x.status === SurescriptsNotificationStatus.Unread).length;
    }));
  }

  itemClicked(item: SurescriptsNotification) {
    if (item.status === SurescriptsNotificationStatus.Unread) {
      this.http.put<SurescriptsNotification>(`${this.ssoBaseUrl}/app/v1/user/notifications/${item.id}/read`, null,
      { withCredentials: true }).pipe(tap(() => {
        item.status = SurescriptsNotificationStatus.Read;
        this.unreadCount = this.unreadCount - 1;
      })).subscribe();
    }
  }

  dismiss($event: MouseEvent, item: SurescriptsNotification) {
    const index = this.notifications.items.indexOf(item);
    $event.stopPropagation();
    if (index >= 0) {
      this.http.put<SurescriptsNotification>(`${this.ssoBaseUrl}/app/v1/user/notifications/${item.id}/dismiss`, null,
      { withCredentials: true }).pipe(tap(() => {
        this.notifications.items.splice(index, 1);
        if (item.status === SurescriptsNotificationStatus.Unread) {
          this.unreadCount = this.unreadCount - 1;
        }
      })).subscribe();
    }
  }
}
