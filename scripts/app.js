// DOM queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');

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

// get chat and render
chatroom.getChats(data => chatUI.render(data));