const hasUserReadTheChat = (chat: any, userId: any) => {
  let didOrDidNot: boolean = false;
  for (let reader of chat.lastMessage.readers) {
    if (reader.reader.id === userId) {
      didOrDidNot = true;
    }
  }
  return didOrDidNot;
};

export default hasUserReadTheChat;
