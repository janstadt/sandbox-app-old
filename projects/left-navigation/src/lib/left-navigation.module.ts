import { NgModule, ModuleWithProviders } from '@angular/core';
import { LeftNavigationComponent } from './left-navigation.component';
import { LeftNavigationService } from './left-navigation.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  declarations: [LeftNavigationComponent],
  exports: [LeftNavigationComponent]
})
export class LeftNavigationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft, faChevronRight);
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LeftNavigationModule,
      providers: [ LeftNavigationService ]
    };
  }
}

export { NavHeading, NavItem, NavItemType, NavItemLink } from './nav-item.model';
export { LeftNavigationService } from './left-navigation.service';
