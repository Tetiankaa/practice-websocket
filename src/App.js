import './App.css';
import {w3cwebsocket as  W3CWebSocket} from "websocket";
import {useEffect, useState} from "react";


const url = 'ws://localhost:8080/chat';
const client = new W3CWebSocket(url);

function App() {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {

    client.onmessage = null;

    client.onopen = (e) =>{
      console.log('connected to chat', e)
    };

    client.onmessage = (e) =>{
      setMessages(prevState => [...prevState, e.data]);

    }
  }, []);

  function sendMessage(e){
    e.preventDefault();
    console.log(messageToSend)
    client.send(messageToSend);
    setMessageToSend("");

  }
  return (
      <>
          <div>
            <form onSubmit={sendMessage}>
              <input type="text" placeholder={"Enter message"} value={messageToSend} onChange={(e)=>setMessageToSend(e.target.value)}/>
              <button>Send</button>
            </form>
          </div>
          {
            messages.map(msg=><p key={msg}>{msg}</p>)
          }
      </>
  );
}

export default App;
