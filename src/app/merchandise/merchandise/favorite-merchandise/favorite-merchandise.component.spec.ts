import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMerchandiseComponent } from './favorite-merchandise.component';

describe('FavoriteMerchandiseComponent', () => {
  let component: FavoriteMerchandiseComponent;
  let fixture: ComponentFixture<FavoriteMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMerchandiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
