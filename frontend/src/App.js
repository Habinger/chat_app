import { io } from 'socket.io-client';
import { useState } from 'react';
import Chat from './chat';

import './App.css';

const socket = io("http://localhost:5000")



function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const enterRoom=()=>{
    if (username !== "" && room !== ""){
    socket.emit("join_room", room);
    setShowChat(true);
  }}
 
  return (
    <div className="App">
      {!showChat?(
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
      <input type="text" placeholder='input user name here.'  onChange={(e)=>{setUsername(e.target.value)}} class="form-control" />
      <input type="text" placeholder='input room ID here.'  onChange={(e)=>{setRoom(e.target.value)}} class="form-control"/>
      <button className=" App btn btn-sm btn-outline-primary m-1" onClick={enterRoom}>Join Room</button>
      </div>):(
      
  
  


      <Chat socket={socket} room={room} username={username} className="App"/>
      )}
    </div>

    
  );
}

export default App;
