import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNotificationsComponent } from './sidebar-notifications.component';

describe('SidebarNotificationsComponent', () => {
  let component: SidebarNotificationsComponent;
  let fixture: ComponentFixture<SidebarNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
