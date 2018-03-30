import { TestBed, inject } from '@angular/core/testing';

import { DanhMucService } from './danhmuc.service';

describe('DanhMucService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DanhMucService]
    });
  });

  it('should be created', inject([DanhMucService], (service: DanhMucService) => {
    expect(service).toBeTruthy();
  }));
});
