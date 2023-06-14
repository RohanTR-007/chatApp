// import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom"
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={Chats} />
    </div>
  );
}

export default App;
