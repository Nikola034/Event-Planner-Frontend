import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { UserOverviewDTO } from '../../user/user-overview-dto';
import { UserService } from '../../user/user.service';
import { JwtService } from '../../auth/jwt.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanel, ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { MessageDTO } from '../message-dto';
import { MessengerService } from '../messenger.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [ButtonModule, DataViewModule, CommonModule, AvatarModule, ScrollPanelModule, PanelModule, InputTextModule, DividerModule, FormsModule],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss'
})
export class MessengerComponent implements OnInit {
  constructor(private userService: UserService, public jwtService: JwtService, private messengerService: MessengerService) { }
  users: UserOverviewDTO[] = [];
  selectedUser: any = null;
  messages: MessageDTO[] = [];
  messageContent: string = "";
  showMessages:boolean=false;
  @ViewChild('messagePanel') messagePanel!: ScrollPanel;

  onUserSelect(user: any) {
    this.selectedUser = user;
    this.loadMessages();
  }

  loadMessages() {
    this.messengerService.getMessagesBySenderAndRecipient(
      this.jwtService.getIdFromToken(),
      this.selectedUser.id
    ).subscribe({
      next: (response) => {
        this.messages = response;
        this.scrollToBottom();
        this.showMessages=true;
      },
      error: (err) => {
        console.error('Error fetching messages', err);
      }
    });
  }

  sendMessage() {
    if (!this.messageContent.trim()) return;

    this.messengerService.sendMessage(
      this.jwtService.getIdFromToken(),
      this.selectedUser.id,
      this.messageContent
    ).subscribe({
      next: (response) => {
        // Add the new message to the messages array
        this.messages.push({
          ...response
          // Add any other necessary properties
        });

        // Clear input and scroll to bottom
        this.messageContent = '';
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error sending message', err);
      }
    });
  }

  // Scroll to bottom of message panel
  scrollToBottom() {
    setTimeout(() => {
      if (this.messagePanel) {
        const element = this.messagePanel.el.nativeElement.getElementsByClassName('p-scrollpanel-content')[0];
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      }
    }, 100);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userService.getServiceProvidersForOrganizerEvents(this.jwtService.getIdFromToken(), this.jwtService.getRoleFromToken()).subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (err) => {
          console.error('Error fetching service providers', err);
        },
      });
    }
  }


}
