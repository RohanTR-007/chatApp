const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel");
const jwt = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json("Fill all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json("User already exists");
  }
  // await User.deleteMany();
  const user = await User.create({ name, email, password, pic });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: jwt(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authuser = asyncHandler(async (req,res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic:user.pic,
      token : jwt(user._id),
    });
  } else {
    res.status(401).json('invalid emial or password');
  }

});


// /user?search="rohan"
const allUsers= asyncHandler(async(req,res)=>{
  const key = req.query.search
  ?{$or:[
    { name: { $regex: req.query.search, $options: "i" } },
    { email: { $regex: req.query.search, $options: "i" } },
  ],
  }
  :{}

  const usrs =  await User.find(key).find({_id : {$ne:req.user._id}})
  res.send(usrs)
})

module.exports = { registerUser, authuser, allUsers };
