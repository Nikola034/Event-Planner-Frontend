import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceCategoryComponent } from './replace-category.component';

describe('ReplaceCategoryComponent', () => {
  let component: ReplaceCategoryComponent;
  let fixture: ComponentFixture<ReplaceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaceCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
