import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusiness } from './new-business';

describe('NewBusiness', () => {
  let component: NewBusiness;
  let fixture: ComponentFixture<NewBusiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBusiness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBusiness);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
