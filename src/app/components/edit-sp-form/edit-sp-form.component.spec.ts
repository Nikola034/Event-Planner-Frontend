import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpFormComponent } from './edit-sp-form.component';

describe('EditSpFormComponent', () => {
  let component: EditSpFormComponent;
  let fixture: ComponentFixture<EditSpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
