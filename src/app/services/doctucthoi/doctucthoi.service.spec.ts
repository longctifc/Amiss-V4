import { TestBed, inject } from '@angular/core/testing';

import { DoctucthoiService } from './doctucthoi.service';

describe('DoctucthoiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctucthoiService]
    });
  });

  it('should be created', inject([DoctucthoiService], (service: DoctucthoiService) => {
    expect(service).toBeTruthy();
  }));
});
