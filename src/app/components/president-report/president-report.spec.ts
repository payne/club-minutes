import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentReport } from './president-report';

describe('PresidentReport', () => {
  let component: PresidentReport;
  let fixture: ComponentFixture<PresidentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresidentReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresidentReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
