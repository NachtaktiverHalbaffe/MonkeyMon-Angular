import { TestBed } from '@angular/core/testing';

import { MonkeyApiService } from './monkey-api.service';

describe('MonkeyApiService', () => {
  let service: MonkeyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonkeyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
