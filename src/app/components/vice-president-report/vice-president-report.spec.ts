import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicePresidentReport } from './vice-president-report';

describe('VicePresidentReport', () => {
  let component: VicePresidentReport;
  let fixture: ComponentFixture<VicePresidentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VicePresidentReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VicePresidentReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
