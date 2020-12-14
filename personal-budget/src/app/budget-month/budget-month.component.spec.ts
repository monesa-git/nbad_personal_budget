import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMonthComponent } from './budget-month.component';

describe('BudgetMonthComponent', () => {
  let component: BudgetMonthComponent;
  let fixture: ComponentFixture<BudgetMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
