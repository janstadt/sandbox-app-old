import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { AppComponent } from './app.component';
// import { ProductDropdownModule } from 'product-dropdown';
import { fakeBackendProvider } from './app.httpInterceptor';
import { UserProfileModule } from 'user-profile';
// import { LeftNavigationModule } from 'left-navigation';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserPlus, faUserMd, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LeftNavComponent } from './left-nav.component';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component';
// import { NotificationsModule } from 'notifications';



@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LeftNavComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    UserProfileModule,
    FontAwesomeModule,
    // LeftNavigationModule.forRoot(),
    // ProductDropdownModule,
    // NotificationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'left-nav', component: LeftNavComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:id', component: SearchComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [fakeBackendProvider]
})
export class AppModule {
  constructor(fontLibrary: FaIconLibrary) {
    fontLibrary.addIcons(faSearch, faUserPlus, faUserMd, faChevronLeft, faChevronRight);
  }
 }
