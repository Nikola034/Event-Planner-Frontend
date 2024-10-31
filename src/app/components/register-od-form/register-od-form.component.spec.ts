import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOdFormComponent } from './register-od-form.component';

describe('RegisterOdFormComponent', () => {
  let component: RegisterOdFormComponent;
  let fixture: ComponentFixture<RegisterOdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
