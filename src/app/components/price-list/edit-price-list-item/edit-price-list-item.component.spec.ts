import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriceListItemComponent } from './edit-price-list-item.component';

describe('EditPriceListItemComponent', () => {
  let component: EditPriceListItemComponent;
  let fixture: ComponentFixture<EditPriceListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPriceListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPriceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
