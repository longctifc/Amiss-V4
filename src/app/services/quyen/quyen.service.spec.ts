import { TestBed, inject } from '@angular/core/testing';

import { QuyenService } from './quyen.service';

describe('QuyenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuyenService]
    });
  });

  it('should be created', inject([QuyenService], (service: QuyenService) => {
    expect(service).toBeTruthy();
  }));
});
