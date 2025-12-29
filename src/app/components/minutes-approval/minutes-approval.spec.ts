import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesApproval } from './minutes-approval';

describe('MinutesApproval', () => {
  let component: MinutesApproval;
  let fixture: ComponentFixture<MinutesApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinutesApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
