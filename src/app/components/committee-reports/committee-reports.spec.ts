import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeReports } from './committee-reports';

describe('CommitteeReports', () => {
  let component: CommitteeReports;
  let fixture: ComponentFixture<CommitteeReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitteeReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
