import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTutorsPageComponent } from './listing-tutors-page.component';

describe('ListingTutorsPageComponent', () => {
  let component: ListingTutorsPageComponent;
  let fixture: ComponentFixture<ListingTutorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTutorsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTutorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
