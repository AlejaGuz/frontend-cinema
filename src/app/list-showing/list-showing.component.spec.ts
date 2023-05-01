import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShowingComponent } from './list-showing.component';

describe('ListShowingComponent', () => {
  let component: ListShowingComponent;
  let fixture: ComponentFixture<ListShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShowingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
