import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarNotificationsComponent } from '../sidebar-notifications/sidebar-notifications.component';
import { DialogModule } from 'primeng/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterSpFormComponent } from '../register-sp-form/register-sp-form.component';
import { RegisterEoFormComponent } from '../register-eo-form/register-eo-form.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ThemeService } from '../../theme.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { Router } from '@angular/router';
import { SearchService } from '../search-page/search.service';
import { JwtService } from '../auth/jwt.service';
import { UserService } from '../user/user.service';
import { response } from 'express';
import { debounceTime, tap } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NotificationService } from '../sidebar-notifications/notification.service';
import { BadgeModule } from 'primeng/badge';
import { SuspensionService } from '../../suspension.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    ScrollPanelModule,
    DialogModule,
    SplitButtonModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    SidebarModule,
    SidebarNotificationsComponent,
    SideMenuComponent,
    BadgeModule
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  username!: string;
  sidemenuVisible: boolean = false;
  notificationsVisible: boolean = false;
  searchText: string = '';
  notificationsEnabled: boolean = false;
  newNotifications:number=0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private themeService: ThemeService,
    private router: Router,
    private searchService: SearchService,
    private jwtService: JwtService,
    private userService: UserService,
    private notificationService:NotificationService,
    private suspensionService:SuspensionService
  ) {}

  changeTheme() {
    this.themeService.changeTheme();
  }

  public getNewNotifications(){
    return this.newNotifications.toString();
  }

  showNotifications(){
    this.notificationsVisible=true;
    this.newNotifications=0;
  }

  ngOnInit() {
    if (this.jwtService.getIdFromToken() != -1) {
      this.notificationService.onNotificationReceived().subscribe(notification => {
        this.newNotifications++;
      });
    }
    this.searchService.search$.subscribe({
      next: (data: string) => {
        this.searchText = data;
      },
    });
    if (isPlatformBrowser(this.platformId)) {
      if (this.jwtService.IsLoggedIn()) {
        if (this.jwtService.getRoleFromToken() == 'AU') {
          this.userService
            .getAuById(this.jwtService.getIdFromToken())
            .pipe(
              tap((response) => {
                this.username = response.email;
                this.items = [
                  {
                    label: this.username || 'Loading..',
                    icon: '',
                    items: [
                      {
                        label: 'Become an Event Organizer',
                        icon: 'pi pi-user',
                        command: () => this.register('eo'),
                      },
                      {
                        label: 'Become a Service Provider',
                        icon: 'pi pi-cog',
                        command: () => this.register('sp'),
                      },
                      {
                        label: 'Help',
                        icon: 'pi pi-question',
                      },
                      {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout(),
                      },
                    ],
                  },
                ];
              })
            )
            .subscribe();
        } else if (this.jwtService.getRoleFromToken() == 'EO') {
          this.userService
            .getEoById(this.jwtService.getIdFromToken())
            .pipe(
              tap((response) => {
                this.username = response.name + ' ' + response.surname;
                this.items = [
                  {
                    label: this.username || 'Loading..',
                    icon: '',
                    items: [
                      {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => this.editProfile('eo'),
                      },
                      {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'Help',
                        icon: 'pi pi-question',
                      },
                      {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout(),
                      },
                    ],
                  },
                ];
              })
            )
            .subscribe();
        } else if (this.jwtService.getRoleFromToken() == 'SP') {
          this.userService
            .getSpById(this.jwtService.getIdFromToken())
            .pipe(
              tap((response) => {
                this.username = response.name + ' ' + response.surname;
                this.items = [
                  {
                    label: this.username || 'Loading..',
                    icon: '',
                    items: [
                      {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => this.editProfile('sp'),
                      },
                      {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'Help',
                        icon: 'pi pi-question',
                      },
                      {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout(),
                      },
                    ],
                  },
                ];
              })
            )
            .subscribe();
        } else if (this.jwtService.getRoleFromToken() == 'A') {
          this.userService
            .getAdminById(this.jwtService.getIdFromToken())
            .pipe(
              tap((response) => {
                this.username = response.name + ' ' + response.surname;
                this.items = [
                  {
                    label: this.username || 'Loading..',
                    icon: '',
                    items: [
                      {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'Help',
                        icon: 'pi pi-question',
                      },
                      {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout(),
                      },
                    ],
                  },
                ];
              })
            )
            .subscribe();
        }
      }else{
        this.items = [
          {
            label: 'Guest',
            icon: '',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-sign-in',
                command: () => this.login(),
              },
              {
                label: 'Register',
                icon: 'pi pi-user-plus',
                command: () => this.register('au'),
              },
              {
                label: 'Register as Event organizer',
                icon: 'pi pi-user-plus',
                command: () => this.register('eo'),
              },
              {
                label: 'Register as Service provider',
                icon: 'pi pi-user-plus',
                command: () => this.register('sp'),
              },
            ],
          },
        ];
      }
    }
  }

  editProfile(role: string){
    if(role == 'au'){
      this.router.navigate(['edit-au', this.jwtService.getIdFromToken()]);
    }
    else if(role == 'eo'){
      this.router.navigate(['edit-eo', this.jwtService.getIdFromToken()]);
    }
    else if(role == 'sp'){
      this.router.navigate(['edit-sp', this.jwtService.getIdFromToken()]);
    }
  }

  login(){
    this.router.navigate(['']);
  }

  register(role: string){
    if(role == 'au'){
      this.router.navigate(['register-au']);
    }
    else if(role == 'eo'){
      this.router.navigate(['register-eo']);
    }
    else if(role == 'sp'){
      this.router.navigate(['register-sp']);
    }
  } 

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  logout() {
    this.suspensionService.disconnect();
    this.notificationService.disconnect();
    this.jwtService.Logout();
    this.router.navigate(['']);
  }
  onSearchChange() {
    this.searchService.updateSearch(this.searchText);
  }
}
