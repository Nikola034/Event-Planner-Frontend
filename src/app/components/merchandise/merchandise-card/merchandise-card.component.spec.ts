import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseCardComponent } from './merchandise-card.component';

describe('MerchandiseCardComponent', () => {
  let component: MerchandiseCardComponent;
  let fixture: ComponentFixture<MerchandiseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchandiseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchandiseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
