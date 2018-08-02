import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserInfoComponent } from './card-user-info.component';

describe('CardUserInfoComponent', () => {
  let component: CardUserInfoComponent;
  let fixture: ComponentFixture<CardUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
