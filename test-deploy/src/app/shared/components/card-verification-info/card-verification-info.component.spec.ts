import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVerificationInfoComponent } from './card-verification-info.component';

describe('CardVerificationInfoComponent', () => {
  let component: CardVerificationInfoComponent;
  let fixture: ComponentFixture<CardVerificationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVerificationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVerificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
