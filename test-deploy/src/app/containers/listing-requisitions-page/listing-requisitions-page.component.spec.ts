import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingRequisitionsPageComponent } from './listing-requisitions-page.component';

describe('ListingRequisitionsPageComponent', () => {
  let component: ListingRequisitionsPageComponent;
  let fixture: ComponentFixture<ListingRequisitionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingRequisitionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingRequisitionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
