import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCategoryComponent } from './recommend-category.component';

describe('RecommendCategoryComponent', () => {
  let component: RecommendCategoryComponent;
  let fixture: ComponentFixture<RecommendCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
