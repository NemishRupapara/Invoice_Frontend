import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMethodComponent } from './menu-method.component';

describe('MenuMethodComponent', () => {
  let component: MenuMethodComponent;
  let fixture: ComponentFixture<MenuMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMethodComponent]
    });
    fixture = TestBed.createComponent(MenuMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
