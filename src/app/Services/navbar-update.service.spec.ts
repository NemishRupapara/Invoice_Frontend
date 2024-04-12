import { TestBed } from '@angular/core/testing';

import { NavbarUpdateService } from './navbar-update.service';

describe('NavbarUpdateService', () => {
  let service: NavbarUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
