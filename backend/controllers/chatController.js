const asyncHandler = require("express-async-handler");
const Chat = require("../modals/chatModel");
const jwt = require("../config/generateToken");
const User = require("../modals/userModel");

const acessChat = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    console.log("User id not sent in body");
    return res.sendStatus(401);
  }

  try {
    var isChat = Chat.find({
      groupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } }, //req.user._id -> logged in userID
        { users: { $elemMatch: { $eq: userID } } }, //userID ->userID to be searched
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select:"name email pic"
      });
  } catch (err) {
    res.status(401).json("Requested userID Doesn't exist");
  }
  if (isChat.length > 0) {
    res.status(200);
    res.send(isChat[0]);
  } else {
    chatData = {
      chatName: "sender",
      groupChat: false,
      users: [req.user._id, userID],
    };
    try {
      const createChat = await Chat.create(chatData);
      const newChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      ); //populate
      res.status(200);
      res.send(newChat);
    } catch (err) {
      res.status(401);
      throw new Error(err.message);
    }
  }
});


const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-Password")
      .populate("latestMessage")
      .populate("groupAdmin", "-Password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name, pic, email",
        });
        res.status(200);
        res.send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});







// const fetchChats = asyncHandler(async (req, res) => {

//   try {
//    await Chat.find({
//       users: { $elemMatch: { $eq: req.user._id } },
//     })
//       .populate("users", "-password")
//       .populate("latestMessage")
//       .populate("groupAdmin", "-password")
//       .sort({ updatedAt: -1 })
//       .then(async (results) => {
//                 results = await User.populate(results, {
//                     path: 'latestMessage.sender',
//                     select: 'name, pic, email'
//                 })
//     res.send(results);
//     res.status(200);
//     })} catch (err) {
//     res.status(400);
//     res.send(err.message);
//   }
// });

const createGroup = asyncHandler(async (req, res) => {
  var { name, users } = req.body;

  console.log(req.user);

  if (!name || !users) {
    res.status(400);
    res.send("Pls enter all the fields");
  }

  users = JSON.parse(users);

  if (users.length < 2) {
    return res.status(400).send("Group shud contain more than two users");
  }

  users.push(req.user._id); // logged in user (the one who is creating group)
  groupAdmins = [req.user._id];
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      groupChat: true,
      users: users,
      groupAdmin: groupAdmins,
    });

    const fullGroupChat = await Chat.find({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatID, groupName } = req.body;
  try {
    var updateChat = await Chat.findByIdAndUpdate(
      chatID,
      { chatName: groupName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  } catch (err) {
    return res.status(400).send("Update failed");
  }
  if (!updateChat) {
    res.status(400);
    res.send("Chat/Group not found");
  } else {
    res.status(200).send(updateChat);
  }
});

const addTogroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  try {
    var addUser = await Chat.findByIdAndUpdate(
      chatID,
      { $push: { users: userID } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  } catch (err) {
    return res.status(400).send("Failed to find group");
  }
  if (!addUser) {
    res.status(400);
    res.send("Chat/Group not found");
  } else {
    res.status(200).send(addUser);
  }
});

const removefromGroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  try {
    var removeUser = await Chat.findByIdAndUpdate(
      chatID,
      { $pull: { users: userID } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  } catch (err) {
    return res.status(400).send("Failed to find group");
  }
  if (!removeUser) {
    res.status(400);
    res.send("Chat/Group not found");
  } else {
    res.status(200).send(removeUser);
  }
});

module.exports = {
  acessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addTogroup,
  removefromGroup,
};
