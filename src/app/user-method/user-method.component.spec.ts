import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMethodComponent } from './user-method.component';

describe('UserMethodComponent', () => {
  let component: UserMethodComponent;
  let fixture: ComponentFixture<UserMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMethodComponent]
    });
    fixture = TestBed.createComponent(UserMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
