const messageList = [
  { roomId: "masterroom", sender: "admin", msg: "you have been kicked" },
  { roomId: "masterroom", sender: "apedude", msg: "you have been liked" },
  { roomId: "notyours", sender: "admin", msg: "you have been botherd" },
  { roomId: "masterroom", sender: "admin", msg: "you have been kicked" }
];

const addMessageToRoom = (roomId, message) => {
  const formattedMsg = {
    roomId: roomId,
    sender: message.user,
    msg: message.text
  };
  messageList.push(formattedMsg);

  return formattedMsg;
};

const getMessagesFromRoom = roomId => {
  return messageList.filter(room => room.roomId === roomId);
};

const getAllMessages = () => messageList;

module.exports = { addMessageToRoom, getMessagesFromRoom, getAllMessages };
