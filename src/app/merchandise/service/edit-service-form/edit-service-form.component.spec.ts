import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceFormComponent } from './edit-service-form.component';

describe('EditServiceFormComponent', () => {
  let component: EditServiceFormComponent;
  let fixture: ComponentFixture<EditServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
