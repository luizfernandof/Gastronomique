import { TestBed } from '@angular/core/testing';

import { PregaoService } from './pregao.service';

describe('PregaoService', () => {
  let service: PregaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
