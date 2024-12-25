import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetFormComponent } from './edit-budget-form.component';

describe('EditBudgetFormComponent', () => {
  let component: EditBudgetFormComponent;
  let fixture: ComponentFixture<EditBudgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBudgetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
