const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data.js");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const {notFound,errHandler} = require("./middleware/errMiddleWare")
const app = express();
dotenv.config();
connectDB();


app.use(express.json());



app.use("/user",userRoutes)
app.use("/chats",chatRoutes)

app.use(notFound)
app.use(errHandler)

app.get("/chats/:id", (req, res) => {
  // const id=req.params.id
  // console.log(req.params)
  const chat = chats.find((c) => c._id == req.params.id);
  res.send(chat);
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));


// rohan;
// Rock345