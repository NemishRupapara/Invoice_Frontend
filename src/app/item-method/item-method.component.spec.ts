import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMethodComponent } from './item-method.component';

describe('ItemMethodComponent', () => {
  let component: ItemMethodComponent;
  let fixture: ComponentFixture<ItemMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemMethodComponent]
    });
    fixture = TestBed.createComponent(ItemMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
