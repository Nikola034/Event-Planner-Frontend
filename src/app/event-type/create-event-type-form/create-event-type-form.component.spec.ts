import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventTypeFormComponent } from './create-event-type-form.component';

describe('CreateEventTypeFormComponent', () => {
  let component: CreateEventTypeFormComponent;
  let fixture: ComponentFixture<CreateEventTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
