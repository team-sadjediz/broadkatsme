const users = [
  { socketID: "socketIDadmin", id: "adminID", name: "admin", room: "masteroom" }
];

const addUser = ({ socketID, id, name, room }) => {
  // id = id.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const existingUser = users.find(user => user.room === room && user.id === id);

  if (!id || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { socketID, id, name, room };

  users.push(user);

  return { user };
};

const removeUser = socketID => {
  const index = users.findIndex(user => user.socketID === socketID);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = socketID => users.find(user => user.socketID === socketID);

const getUsersInRoom = room => users.filter(user => user.room === room);

const getAllUsers = () => users;

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getAllUsers };
