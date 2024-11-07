import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { SideMenuBarComponent } from "../side-menu-bar/side-menu-bar.component";
import { SidebarNotificationsComponent } from "../sidebar-notifications/sidebar-notifications.component";
import { DialogModule } from 'primeng/dialog';
import { LoginFormComponent } from "../login-form/login-form.component";
import { RegisterPupFormComponent } from "../register-pup-form/register-pup-form.component";
import { RegisterOdFormComponent } from '../register-od-form/register-od-form.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ScrollPanelModule,DialogModule, SplitButtonModule, InputTextModule, ButtonModule, InputIconModule, RegisterPupFormComponent, RegisterOdFormComponent,IconFieldModule, FormsModule, AvatarModule, AvatarGroupModule, MenubarModule, SidebarModule, SideMenuBarComponent, SidebarNotificationsComponent, LoginFormComponent, RegisterPupFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  username: string = "Goci Ristic";
  sidemenuVisible: boolean = false;
  notificationsVisible: boolean = false;
  

  loginDialogVisible: boolean = false;
  constructor(private themeService:ThemeService){}

    showLoginDialog() {
        this.loginDialogVisible = true;
    }

    closeLoginDialog() {
        this.loginDialogVisible = false;
    }

    registerPupDialogVisible: boolean = false;

    showPupDialog() {
        this.registerPupDialogVisible = true;
    }

    closePupDialog() {
        this.registerPupDialogVisible = false;
    }
    registerOdDialogVisible: boolean = false;

    showOdDialog() {
        this.registerOdDialogVisible = true;
    }

    closeOdDialog() {
        this.registerOdDialogVisible = false;
    }
    changeTheme() {
        this.themeService.changeTheme();
    }
    ngOnInit() {
      this.items = [
        {
            label: this.username,
            icon: '',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Help',
                    icon: 'pi pi-question'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ]
    }
}
