import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBugetComponent } from './add-buget.component';

describe('AddBugetComponent', () => {
  let component: AddBugetComponent;
  let fixture: ComponentFixture<AddBugetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBugetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBugetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
