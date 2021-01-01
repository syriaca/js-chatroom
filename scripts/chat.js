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
    }

    // updating the room
    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) { this.unsub(); };
    }
}

const chatroom = new Chatroom('general', 'jean-yves');

chatroom.getChats((data) => {
    console.log(data);
})

setTimeout(() => {
    chatroom.updateRoom('general');
    chatroom.updateUsername('Jean-Yves');
    chatroom.getChats((data) => {
        console.log(data);
    });
    chatroom.addChat('we get to e new general room');
}, 3000);