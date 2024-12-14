import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportsTableComponent } from './user-reports-table.component';

describe('UserReportsTableComponent', () => {
  let component: UserReportsTableComponent;
  let fixture: ComponentFixture<UserReportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReportsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
