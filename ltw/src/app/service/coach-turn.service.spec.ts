import { TestBed } from '@angular/core/testing';

import { CoachTurnService } from './coach-turn.service';

describe('CoachTurnService', () => {
  let service: CoachTurnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachTurnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
