import { TestBed, inject } from '@angular/core/testing';

import { LeftNavigationService } from './left-navigation.service';

describe('LeftNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeftNavigationService]
    });
  });

  it('should be created', inject([LeftNavigationService], (service: LeftNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
