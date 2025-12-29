import { TestBed } from '@angular/core/testing';

import { MinutesData } from './minutes-data';

describe('MinutesData', () => {
  let service: MinutesData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinutesData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
