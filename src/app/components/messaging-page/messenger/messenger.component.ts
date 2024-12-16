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
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserReportDTO } from '../user-report-dto';
import { UserReportService } from '../user-report.service';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [ButtonModule, DataViewModule, CommonModule, ToastModule,AvatarModule,InputTextareaModule, ScrollPanelModule, PanelModule, InputTextModule, DialogModule,InputTextModule,DividerModule, FormsModule],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss',
  providers: [DialogService,MessageService]
})
export class MessengerComponent implements OnInit {
  constructor(private userService: UserService, public jwtService: JwtService, private messengerService: MessengerService,private messageService:MessageService,private userReportService:UserReportService) { }
  users: UserOverviewDTO[] = [];
  selectedUser: any = null;
  messages: MessageDTO[] = [];
  messageContent: string = "";
  showMessages:boolean=false;
  @ViewChild('messagePanel') messagePanel!: ScrollPanel;
  reportDialogVisible: boolean = false;
  reportReason: string = '';
  isSubmitting: boolean = false;
  blockConfirmationDialogVisible: boolean = false;

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
      this.userService.getChatUsers(this.jwtService.getIdFromToken(), this.jwtService.getRoleFromToken()).subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (err) => {
          console.error('Error fetching service providers', err);
        },
      });
    }
  }
  openReportDialog() {
    // Reset report reason when opening dialog
    this.reportReason = '';
    this.reportDialogVisible = true;
  }

  cancelReport() {
    this.reportDialogVisible = false;
    this.reportReason = '';
  }

  submitReport() {
    if (!this.selectedUser) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'No user selected to report', 
        life: 3000 
      });
      return;
    }

    if (this.reportReason.trim()) {
      // Prevent multiple submissions
      this.isSubmitting = true;

      // Prepare report DTO
      const reportRequest: UserReportDTO = {
        reporterId:this.jwtService.getIdFromToken(),
        reportedUserId: this.selectedUser.id,
        reason: this.reportReason.trim()
      };

      // Submit report via service
      this.userReportService.reportUser(reportRequest).subscribe({
        next: (response) => {
          // Success handling
          this.messageService.add({ 
            severity: 'success', 
            summary: 'User Reported', 
            detail: 'The user has been reported successfully', 
            life: 3000 
          });
          this.reportDialogVisible = false;
          this.reportReason = '';
        },
        error: (error) => {
          // Error handling
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Report Failed', 
            detail: error.message || 'Unable to submit report', 
            life: 3000 
          });
        },
        complete: () => {
          // Reset submission state
          this.isSubmitting = false;
        }
      });
    } else {
      // Show error toast if no reason provided
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Report Failed', 
        detail: 'Please provide a reason for reporting', 
        life: 3000 
      });
    }
  }
  blockUser() {
    if (!this.selectedUser) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'No user selected to block', 
        life: 3000 
      });
      return;
    }
  
    // Open the confirmation dialog instead of directly blocking
    this.blockConfirmationDialogVisible = true;
  }
  
  // Add a new method to confirm blocking
  confirmBlockUser() {
    if (!this.selectedUser) return;
  
    const currentUserId = this.jwtService.getIdFromToken();
    const userToBlockId = this.selectedUser.id;
  
    this.userService.blockUser(currentUserId, userToBlockId).subscribe({
      next: (response) => {
        // Show success toast
        this.messageService.add({ 
          severity: 'success', 
          summary: 'User Blocked', 
          detail: `${response}`, 
          life: 3000 
        });
  
        // Reset the selected user and hide messages
        this.selectedUser = null;
        this.showMessages = false;
        this.messages = [];
  
        // Refresh the user list to remove blocked user
        this.ngOnInit();
  
        // Close the confirmation dialog
        this.blockConfirmationDialogVisible = false;
      },
      error: (error) => {
        // Show error toast if blocking fails
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Block Failed', 
          detail: error.message || 'Unable to block user', 
          life: 3000 
        });
  
        // Close the confirmation dialog
        this.blockConfirmationDialogVisible = false;
      }
    });
  }
  
  // Add a method to cancel blocking
  cancelBlockUser() {
    this.blockConfirmationDialogVisible = false;
  }


}
