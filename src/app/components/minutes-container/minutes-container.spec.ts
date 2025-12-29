import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesContainer } from './minutes-container';

describe('MinutesContainer', () => {
  let component: MinutesContainer;
  let fixture: ComponentFixture<MinutesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinutesContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
