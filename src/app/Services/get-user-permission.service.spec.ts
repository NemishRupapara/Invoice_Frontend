import { TestBed } from '@angular/core/testing';

import { GetUserPermissionService } from './get-user-permission.service';

describe('GetUserPermissionService', () => {
  let service: GetUserPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
