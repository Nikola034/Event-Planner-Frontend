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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, SplitButtonModule, InputTextModule, ButtonModule, InputIconModule, IconFieldModule, FormsModule, AvatarModule, AvatarGroupModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  username: string = "Goci Ristic";

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
