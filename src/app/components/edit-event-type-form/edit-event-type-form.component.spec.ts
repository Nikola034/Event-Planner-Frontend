import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventTypeFormComponent } from './edit-event-type-form.component';

describe('EditEventTypeFormComponent', () => {
  let component: EditEventTypeFormComponent;
  let fixture: ComponentFixture<EditEventTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEventTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
