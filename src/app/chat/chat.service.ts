// import { Injectable } from '@angular/core';
// import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   constructor(private db: AngularFireDatabase) {}

//   sendMessage(senderId: string, receiverId: string, message: string) {
//     const chatId = this.getChatId(senderId, receiverId);
//     const chatList = this.db.list(`/chats/${chatId}`);
//     chatList.push({ senderId, message, timestamp: Date.now() });
//   }

//   getMessages(senderId: string, receiverId: string): AngularFireList<any> {
//     const chatId = this.getChatId(senderId, receiverId);
//     return this.db.list(`/chats/${chatId}`);
//   }

//   private getChatId(user1: string, user2: string): string {
//     return user1 < user2 ? `${user1}-${user2}` : `${user2}-${user1}`;
//   }
// }






// import { Injectable } from '@angular/core';
// import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   newMessageSubject = new Subject<any>();

//   constructor(private db: AngularFireDatabase) {
//     this.listenForNewMessages();
//   }

//   sendMessage(senderId: string, receiverId: string, message: string) {
//     const chatId = this.getChatId(senderId, receiverId);
//     const chatList = this.db.list(`/chats/${chatId}`);
//     chatList.push({ senderId, message, timestamp: Date.now() });
//   }

//   getMessages(senderId: string, receiverId: string): AngularFireList<any> {
//     const chatId = this.getChatId(senderId, receiverId);
//     return this.db.list(`/chats/${chatId}`);
//   }

//    getChatId(user1: string, user2: string): string {
//     return user1 < user2 ? `${user1}-${user2}` : `${user2}-${user1}`;
//   }

//    listenForNewMessages() {
//     this.db.list('/chats').snapshotChanges(['child_added']).subscribe(changes => {
//       changes.forEach(change => {
//         const chatId = change.payload.key;
//         this.db.list(`/chats/${chatId}`).snapshotChanges(['child_added']).subscribe(messages => {
//           messages.forEach(message => {
//             this.newMessageSubject.next(message.payload.val());
//           });
//         });
//       });
//     });
//   }
// }





import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  sendMessage(senderId: string, receiverId: string, message: string) {
    const chatId = this.getChatId(senderId, receiverId);
    const chatList = this.db.list(`/chats/${chatId}`);
    chatList.push({ senderId, message, timestamp: Date.now() });
    this.incrementMessageCount(chatId);
  }

  getMessages(senderId: string, receiverId: string): AngularFireList<any> {
    const chatId = this.getChatId(senderId, receiverId);
    return this.db.list(`/chats/${chatId}`);
  }

   getChatId(user1: string, user2: string): string {
    return user1 < user2 ? `${user1}-${user2}` : `${user2}-${user1}`;
  }

  getMessageCount(chatId: string): AngularFireObject<any> {
    return this.db.object(`/messageCounts/${chatId}`);
  }

   incrementMessageCount(chatId: string) {
    const messageCountRef = this.db.object(`/messageCounts/${chatId}`);
    messageCountRef.query.ref.transaction(count => (count || 0) + 1);
  }

  resetMessageCount(chatId: string) {
    const messageCountRef = this.db.object(`/messageCounts/${chatId}`);
    messageCountRef.set(0);
  }
}
