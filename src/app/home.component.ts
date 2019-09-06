import { Component } from '@angular/core';
import { LeftNavigationService } from '../../dist/left-navigation';

@Component({
  selector: 'surescripts-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'surescripts';
  constructor(private leftNavService: LeftNavigationService) {
    this.leftNavService.init();
  }
}
