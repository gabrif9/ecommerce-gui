import { TestBed } from '@angular/core/testing';

import { ProductManagementServiceService } from './product-management-service.service';

describe('ProductManagementServiceService', () => {
  let service: ProductManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
