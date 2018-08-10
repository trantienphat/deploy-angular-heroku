import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBannedUserComponent } from './details-banned-user.component';

describe('DetailsBannedUserComponent', () => {
  let component: DetailsBannedUserComponent;
  let fixture: ComponentFixture<DetailsBannedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBannedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBannedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
