const users = [
  {
    socketID: "socketIDadmin",
    id: "adminID",
    name: "admin",
    chatColor: "#000000",
    // blockControl: true,
    room: "masteroom",
  },
];

const addUser = ({ socketID, id, name, chatColor, room }) => {
  // id = id.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.id === id
  );

  if (!id || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { socketID, id, name, chatColor, room };

  users.push(user);

  return { user };
};

const removeUser = (socketID) => {
  const index = users.findIndex((user) => user.socketID === socketID);
  if (index !== -1) return users.splice(index, 1)[0];
};

const updateUser = ({ socketID, id, name, chatColor, room }) => {
  // id = id.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  // const existingUser = users.find(user => user.room === room && user.id === id);

  const index = users.findIndex((user) => user.socketID === socketID);
  const user = { socketID, id, name, chatColor, room };
  if (index !== -1) {
    users[index] = user;
  }

  // return { user };
};

const getUser = (socketID) => users.find((user) => user.socketID === socketID);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getAllUsers = () => users;

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getAllUsers,
  updateUser,
};
