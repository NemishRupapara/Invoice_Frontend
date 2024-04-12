import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustometMethodComponent } from './customet-method.component';

describe('CustometMethodComponent', () => {
  let component: CustometMethodComponent;
  let fixture: ComponentFixture<CustometMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustometMethodComponent]
    });
    fixture = TestBed.createComponent(CustometMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
