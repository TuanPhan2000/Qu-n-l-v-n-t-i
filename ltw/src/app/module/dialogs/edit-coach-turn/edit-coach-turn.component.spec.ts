import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachTurnComponent } from './edit-coach-turn.component';

describe('EditCoachTurnComponent', () => {
  let component: EditCoachTurnComponent;
  let fixture: ComponentFixture<EditCoachTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoachTurnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoachTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
