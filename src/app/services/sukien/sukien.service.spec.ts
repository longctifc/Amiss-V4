import { TestBed, inject } from '@angular/core/testing';

import { SukienService } from './sukien.service';

describe('SukienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SukienService]
    });
  });

  it('should be created', inject([SukienService], (service: SukienService) => {
    expect(service).toBeTruthy();
  }));
});
