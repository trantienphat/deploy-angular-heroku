import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedCardComponent } from './banned-card.component';

describe('BannedCardComponent', () => {
  let component: BannedCardComponent;
  let fixture: ComponentFixture<BannedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
