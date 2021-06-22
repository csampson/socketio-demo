const MessageStore = {
  messages: [],

  post (message) {
    this.messages.push(String(message));
  }
};

module.exports = MessageStore;
