import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSpFormComponent } from './register-sp-form.component';

describe('RegisterSpFormComponent', () => {
  let component: RegisterSpFormComponent;
  let fixture: ComponentFixture<RegisterSpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
