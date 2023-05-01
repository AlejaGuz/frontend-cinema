import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiscountComponent } from './manage-discount.component';

describe('ManageDiscountComponent', () => {
  let component: ManageDiscountComponent;
  let fixture: ComponentFixture<ManageDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
