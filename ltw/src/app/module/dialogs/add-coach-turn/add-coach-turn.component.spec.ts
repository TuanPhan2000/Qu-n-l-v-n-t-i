import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoachTurnComponent } from './add-coach-turn.component';

describe('AddCoachTurnComponent', () => {
  let component: AddCoachTurnComponent;
  let fixture: ComponentFixture<AddCoachTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoachTurnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoachTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
