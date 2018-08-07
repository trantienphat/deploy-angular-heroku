import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserInfoComponent } from './details-user-info.component';

describe('DetailsUserInfoComponent', () => {
  let component: DetailsUserInfoComponent;
  let fixture: ComponentFixture<DetailsUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
