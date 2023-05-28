// import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom"
import chats from "./pages/chats";
import home from "./pages/home";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Route path="/" component={home} exact></Route>
      <Route path="/chats" component={chats}></Route>
    </div>
  );
}

export default App;
