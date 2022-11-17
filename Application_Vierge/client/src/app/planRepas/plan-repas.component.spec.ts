import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRepasComponent } from './plan-repas.component';

describe('PlanRepasComponent', () => {
  let component: PlanRepasComponent;
  let fixture: ComponentFixture<PlanRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
