import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMethodComponent } from './role-method.component';

describe('RoleMethodComponent', () => {
  let component: RoleMethodComponent;
  let fixture: ComponentFixture<RoleMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleMethodComponent]
    });
    fixture = TestBed.createComponent(RoleMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
