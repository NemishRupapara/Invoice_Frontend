import { TestBed } from '@angular/core/testing';

import { AuthInterceptorServiceTsService } from './auth-interceptor.service.ts.service';

describe('AuthInterceptorServiceTsService', () => {
  let service: AuthInterceptorServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
