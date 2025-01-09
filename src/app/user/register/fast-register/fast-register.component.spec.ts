import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRegisterComponent } from './fast-register.component';

describe('FastRegisterComponent', () => {
  let component: FastRegisterComponent;
  let fixture: ComponentFixture<FastRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
