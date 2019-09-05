import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurescriptsUserProfile } from './user-profile.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'surescripts-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input()
  logoutUrl: string;

  @Input()
  ssoBaseUrl: string;
  environment: string;
  isStaging = false;
  isProduction = false;

  constructor(private http: HttpClient) { }

  profile: SurescriptsUserProfile;

  ngOnInit() {
    this.logoutUrl = this.logoutUrl || 'logout';
    if (!this.ssoBaseUrl) {
      throw new Error('"ssoBaseUrl" is required.');
    }
    this.ssoBaseUrl = this.ssoBaseUrl.replace(/\/+$/, '');
    this.http.get<SurescriptsUserProfile>(`${this.ssoBaseUrl}/app/v1/user/profile`,
        { withCredentials: true }).pipe(tap(resp => {
            this.environment = resp.environment && resp.environment.toLocaleUpperCase();
            this.isStaging = this.environment === 'STAGING';
            this.isProduction = this.environment === 'PRODUCTION';
            this.profile = new SurescriptsUserProfile(resp);
        })).subscribe();
  }
}
