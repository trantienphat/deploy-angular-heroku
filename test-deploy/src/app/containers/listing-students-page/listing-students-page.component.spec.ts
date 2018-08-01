import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingStudentsPageComponent } from './listing-students-page.component';

describe('ListingStudentsPageComponent', () => {
  let component: ListingStudentsPageComponent;
  let fixture: ComponentFixture<ListingStudentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingStudentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingStudentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
