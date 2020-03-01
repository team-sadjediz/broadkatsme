const messageList = [
  { roomId: "masterroom", sender: "admin", msg: "you have been kicked" },
  { roomId: "masterroom", sender: "apedude", msg: "you have been liked" },
  { roomId: "notyours", sender: "admin", msg: "you have been botherd" },
  { roomId: "masterroom", sender: "admin", msg: "you have been kicked" }
];

const addMessageToRoom = (roomId, message) => {
  messageList.push({ roomId: roomId, sender: message.user, msg: message.text });

  return message;
};

const getMessagesFromRoom = roomId => {
  let results = messageList.filter(room => room.roomId === roomId);
  console.log(results);
};

const getAllMessages = () => messageList;

module.exports = { addMessageToRoom, getMessagesFromRoom, getAllMessages };
