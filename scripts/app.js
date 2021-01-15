// DOM queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const alertMessage = document.querySelector('.alert-message');
const chatRooms = document.querySelector('.chat-rooms');

// Check local storage for a username
const username = localStorage.userName ? localStorage.userName : "anonymous";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

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
    const newUserName = e.target.name.value.trim();
    chatroom.updateUsername(newUserName);
    newName.reset();
    alertMessage.innerHTML = `Ok username updated to <strong>${newUserName}</strong>`;
    alertMessage.classList.remove('d-none');
    setTimeout(() => {
        alertMessage.classList.add('d-none');
        alertMessage.innerHTML = ""
    }, 3000);
})

// Update the room
chatRooms.addEventListener('click', e => {
    if (e.target.nodeName === "BUTTON") {
        chatUI.clear();
        chatroom.updateRoom(e.target.id);
        chatroom.getChats(data => chatUI.render(data));
    }
})

// get chat and render
chatroom.getChats(data => chatUI.render(data));