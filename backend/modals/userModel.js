const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FiwRJmRx_interface-icons-user-avatar-profile-user-avatar-png%2F&psig=AOvVaw06aO0dyqnzoDs1rFhRTjml&ust=1684084269801000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJif1ffk8v4CFQAAAAAdAAAAABAE",
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPswd) {

  return await bcrypt.compare(enteredPswd, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // bcrypt.hash(this.password,10,function(err,hash){
  //    console.log(hash);
  //    this.password=hash;
  //    console.log(this.password)
  //    if(err)console.log(err)
  // })

});

const User = mongoose.model("User", userModel);

module.exports = User;
