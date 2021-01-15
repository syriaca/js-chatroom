class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    // adding new chat documents
    async addChat(message) {
        // format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    // setting up a real-time listener to get new chats
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update the ui
                        callback(change.doc.data())
                    }
                });
            });
    }

    // updating the username
    updateUsername(username) {
        this.username = username;
        localStorage.setItem('userName', username);
        console.log('username updated');
    }

    // updating the room
    updateRoom(room) {
        this.room = room;
        if (this.unsub) { this.unsub(); };
        console.log('room updated:', room);
    }
}

