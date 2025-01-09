import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuFormComponent } from './edit-au-form.component';

describe('EditAuFormComponent', () => {
  let component: EditAuFormComponent;
  let fixture: ComponentFixture<EditAuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
