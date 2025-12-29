import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldBusiness } from './old-business';

describe('OldBusiness', () => {
  let component: OldBusiness;
  let fixture: ComponentFixture<OldBusiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldBusiness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldBusiness);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
