import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEoFormComponent } from './edit-eo-form.component';

describe('EditEoFormComponent', () => {
  let component: EditEoFormComponent;
  let fixture: ComponentFixture<EditEoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
