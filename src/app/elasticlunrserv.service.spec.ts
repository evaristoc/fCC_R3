import { TestBed, inject } from '@angular/core/testing';

import { ElasticlunrservService } from './elasticlunrserv.service';

describe('ElasticlunrservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElasticlunrservService]
    });
  });

  it('should be created', inject([ElasticlunrservService], (service: ElasticlunrservService) => {
    expect(service).toBeTruthy();
  }));
});
