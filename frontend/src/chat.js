import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({socket, room, username} ) {
    const[currentMessage, setCurrentMessage] = useState("");
    const[chatLog, setChatLog] = useState([]);

    const sendMessage=async()=>{
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":"+new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData);
            setChatLog((prevLog)=>{
                return [...prevLog, messageData]})
            setCurrentMessage("");
    }
    useEffect(()=>{
        socket.on("recieve_message", (data)=>{
            
            setChatLog((prevLog)=>[...prevLog, data])
        })
    },[socket])
   
  return <div className='chat-window'>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
            {chatLog.map((chatLogs)=>{
                return <div className='message' id={username ===chatLogs.author? "you":"other"}>
                    <div>
                    <div className="message-content">
                        <p>{chatLogs.message}</p>
                    </div>
                    <div className="message-meta">
                        <p id='time'>{chatLogs.time}</p>
                        <p id='author'>{chatLogs.author}</p>
                    </div>
                    </div>
                </div>
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
        
            <input type="text"  placeholder="Input message" value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}} onKeyPress={(e)=>e.key ==="Enter" && sendMessage()} />
            <button  onClick={sendMessage}>&#9658;</button>
           
        </div>
  </div>;
}

export default Chat;


