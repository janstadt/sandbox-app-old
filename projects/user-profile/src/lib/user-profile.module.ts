import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
export { SurescriptsUserProfile } from './user-profile.model';
export {SurescriptsUser} from './user.model';
