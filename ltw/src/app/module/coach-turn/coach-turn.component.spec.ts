import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTurnComponent } from './coach-turn.component';

describe('CoachTurnComponent', () => {
  let component: CoachTurnComponent;
  let fixture: ComponentFixture<CoachTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachTurnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
