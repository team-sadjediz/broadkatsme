const messageList = [
  {
    roomId: "masterroom",
    senderID: "senderID",
    senderName: "senderName",
    msg: "you have been kicked"
  }
];

const addMessageToRoom = (roomId, message) => {
  const formattedMsg = {
    roomId: roomId,
    senderID: message.userID,
    senderName: message.user,
    msg: message.text,
    date: message.date
  };
  messageList.push(formattedMsg);
  return formattedMsg;
};

const getMessagesFromRoom = roomId => {
  return messageList.filter(room => room.roomId === roomId);
};

const getAllMessages = () => messageList;

module.exports = { addMessageToRoom, getMessagesFromRoom, getAllMessages };
