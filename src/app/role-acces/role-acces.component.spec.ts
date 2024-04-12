import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccesComponent } from './role-acces.component';

describe('RoleAccesComponent', () => {
  let component: RoleAccesComponent;
  let fixture: ComponentFixture<RoleAccesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAccesComponent]
    });
    fixture = TestBed.createComponent(RoleAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
