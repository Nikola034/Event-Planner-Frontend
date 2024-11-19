import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEoFormComponent } from './register-eo-form.component';

describe('RegisterEoFormComponent', () => {
  let component: RegisterEoFormComponent;
  let fixture: ComponentFixture<RegisterEoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
