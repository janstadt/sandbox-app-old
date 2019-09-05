import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './notifications.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule,
    FontAwesomeModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }

export { SurescriptsNotification } from './notification.model';
export { SurescriptsNotifications } from './notifications.model';
export { SurescriptsNotificationStatus } from './notification-status.enum';

