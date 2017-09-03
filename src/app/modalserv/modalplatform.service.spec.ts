import { TestBed, inject } from '@angular/core/testing';

import { ModalplatformService } from './modalplatform.service';

describe('ModalplatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalplatformService]
    });
  });

  it('should be created', inject([ModalplatformService], (service: ModalplatformService) => {
    expect(service).toBeTruthy();
  }));
});
