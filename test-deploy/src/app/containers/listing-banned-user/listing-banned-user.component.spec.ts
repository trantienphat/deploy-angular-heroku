import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBannedUserComponent } from './listing-banned-user.component';

describe('ListingBannedUserComponent', () => {
  let component: ListingBannedUserComponent;
  let fixture: ComponentFixture<ListingBannedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingBannedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBannedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
