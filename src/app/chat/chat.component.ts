// import { Component, OnInit } from '@angular/core';
// import { ChatService } from '../chat.service';
// import { UserService } from '../Services/user.service';
// import { CustomerService } from '../Services/customer.service';
// import { User2 } from '../Interfaces/User2.interface';
// // import { UserService } from '../user.service'; // Assuming you have a UserService

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   messages: any[] = [];
//   newMessage: string = '';
//   users: any[] = [];
//   selectedUser: any;
//   currentUser: any;

//   constructor(private chatService: ChatService, private userService: UserService,private Itemservice: CustomerService) { }

//   ngOnInit() {
//     this.currentUser = this.userService.getcurrentuserdetails();
//     (this.currentUser,"))))))))))))");
//     this.GetAllUserList();
//   }

//   selectUser(user: any) {
//     this.selectedUser = user;
//     this.loadMessages();
//   }

//   loadMessages() {
//     if (this.selectedUser) {
//       this.chatService.getMessages(this.currentUser.UserID, this.selectedUser.id).valueChanges().subscribe(messages => {
//         this.messages = messages;
//         (this.messages,"0000000000");
//       });
//     }
//   }

//   sendMessage() {
//     if (this.newMessage.trim() && this.selectedUser) {
//       this.chatService.sendMessage(this.currentUser.UserID, this.selectedUser.id, this.newMessage);
//       this.newMessage = '';
//     }
//   }
//   GetAllUserList(){
//     this.Itemservice.GetAllUserList().subscribe(
//       (data: User2[]) => {
//         this.users = data;
//         (this.users);
//       },
//       (error) => {
//         console.error('Error fetching customer list:', error);
//       }
//     );
//   };

// }







// import { Component, OnInit } from '@angular/core';
// import { ChatService } from '../chat.service';
// import { UserService } from '../Services/user.service';
// import { CustomerService } from '../Services/customer.service';
// import { User2 } from '../Interfaces/User2.interface';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   messages: any[] = [];
//   newMessage: string = '';
//   users: any[] = [];
//   selectedUser: any;
//   currentUser: any;
//   newMessageCount: { [key: string]: number } = {};

//   constructor(private chatService: ChatService, private userService: UserService, private Itemservice: CustomerService) { }

//   ngOnInit() {
//     this.currentUser = this.userService.getcurrentuserdetails();
//     (this.currentUser, "))))))))))))");
//     this.GetAllUserList();
//     this.chatService.newMessageSubject.subscribe(message => {
//       const chatId = this.chatService.getChatId(message.senderId, this.currentUser.UserID);
//       if (!this.selectedUser || chatId !== this.chatService.getChatId(this.currentUser.UserID, this.selectedUser.id)) {
//         this.newMessageCount[message.senderId] = (this.newMessageCount[message.senderId] || 0) + 1;
//       }
//     });
//   }

//   selectUser(user: any) {
//     this.selectedUser = user;
//     this.newMessageCount[user.id] = 0;
//     this.loadMessages();
//   }

//   loadMessages() {
//     if (this.selectedUser) {
//       this.chatService.getMessages(this.currentUser.UserID, this.selectedUser.id).valueChanges().subscribe(messages => {
//         this.messages = messages;
//         (this.messages, "0000000000");
//       });
//     }
//   }

//   sendMessage() {
//     if (this.newMessage.trim() && this.selectedUser) {
//       this.chatService.sendMessage(this.currentUser.UserID, this.selectedUser.id, this.newMessage);
//       this.newMessage = '';
//     }
//   }

//   GetAllUserList() {
//     this.Itemservice.GetAllUserList().subscribe(
//       (data: User2[]) => {
//         this.users = data;
//         (this.users);
//       },
//       (error) => {
//         console.error('Error fetching customer list:', error);
//       }
//     );
//   };
// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { UserService } from '../Services/user.service';
import { CustomerService } from '../Services/customer.service';
import { User2 } from '../Interfaces/User2.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage: string = '';
  users: any[] = [];
  selectedUser: any;
  currentUser: any;
  messageCounts: { [key: string]: number } = {};
  messagesSubscription: Subscription | null = null;

  constructor(private chatService: ChatService, private userService: UserService, private Itemservice: CustomerService) { }

  ngOnInit() {
    this.currentUser = this.userService.getcurrentuserdetails();
    (this.currentUser, "))))))))))))");
    this.GetAllUserList();
  }

  ngOnDestroy() {
    this.messagesSubscription?.unsubscribe();
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.resetMessageCount(user);
    this.loadMessages();
  }

  loadMessages() {
    if (this.selectedUser) {
      // Unsubscribe from previous messages subscription
      this.messagesSubscription?.unsubscribe();

      this.messagesSubscription = this.chatService.getMessages(this.currentUser.UserID, this.selectedUser.id).valueChanges().subscribe(messages => {
        this.messages = messages;
        (this.messages, "0000000000");
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      this.chatService.sendMessage(this.currentUser.UserID, this.selectedUser.id, this.newMessage);
      this.newMessage = '';
      // Reset message count for the current chat after sending the message
      this.resetMessageCount(this.selectedUser.id);
    }
  }

  GetAllUserList() {
    this.Itemservice.GetAllUserList().subscribe(
      (data: User2[]) => {
        this.users = data;
        this.users.forEach(user => this.updateMessageCount(user));
        (this.users);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }

  updateMessageCount(user: any) {
    const chatId = this.chatService.getChatId(this.currentUser.UserID, user.id);
    this.chatService.getMessageCount(chatId).valueChanges().subscribe(count => {
      this.messageCounts[chatId] = count || 0;
    });
  }

  resetMessageCount(user: any) {
    const chatId = this.chatService.getChatId(this.currentUser.UserID, user.id);
    this.chatService.resetMessageCount(chatId);
  }

  getMessageCountForUser(user: any): number {
    const chatId = this.chatService.getChatId(this.currentUser.UserID, user.id);
    return this.selectedUser && this.selectedUser.id === user.id ? 0 : (this.messageCounts[chatId] || 0);
  }
}
