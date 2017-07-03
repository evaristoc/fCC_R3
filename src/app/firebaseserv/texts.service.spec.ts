import { TestBed, inject } from '@angular/core/testing';

import { TextsService } from './texts.service';

describe('TextsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextsService]
    });
  });

  it('should be created', inject([TextsService], (service: TextsService) => {
    expect(service).toBeTruthy();
  }));
});
