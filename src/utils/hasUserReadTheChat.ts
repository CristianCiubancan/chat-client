const hasUserReadTheChat = (chat: any, userId: any) => {
  let didOrDidNot: boolean = false;
  for (let reader of chat.lastMessage.readersInfo.readers) {
    if (reader.reader.id === userId) {
      didOrDidNot = true;
    }
  }
  return didOrDidNot;
};

export default hasUserReadTheChat;
