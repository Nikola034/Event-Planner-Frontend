import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPupFormComponent } from './register-pup-form.component';

describe('RegisterPupFormComponent', () => {
  let component: RegisterPupFormComponent;
  let fixture: ComponentFixture<RegisterPupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
