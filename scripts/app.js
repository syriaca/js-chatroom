// DOM queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'jean-yves');

// Add new chat
newChat.addEventListener('submit', e => {
    e.preventDefault();
    chatroom
        .addChat(e.target.message.value.trim())
        .then(() => newChat.reset())
        .catch(error => console.log(error))    
})

// Change username
newName.addEventListener('submit', e => {
    e.preventDefault();
    chatroom.updateUsername(e.target.name.value.trim());
    newName.reset();
})

// get chat and render
chatroom.getChats(data => chatUI.render(data));