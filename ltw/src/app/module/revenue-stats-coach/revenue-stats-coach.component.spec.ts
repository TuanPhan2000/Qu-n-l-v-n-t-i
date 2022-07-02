import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueStatsCoachComponent } from './revenue-stats-coach.component';

describe('RevenueStatsCoachComponent', () => {
  let component: RevenueStatsCoachComponent;
  let fixture: ComponentFixture<RevenueStatsCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueStatsCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueStatsCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
