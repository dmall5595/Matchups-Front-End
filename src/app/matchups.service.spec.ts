import { TestBed, inject } from '@angular/core/testing';

import { MatchupsService } from './matchups.service';

describe('MatchupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchupsService]
    });
  });

  it('should be created', inject([MatchupsService], (service: MatchupsService) => {
    expect(service).toBeTruthy();
  }));
});
