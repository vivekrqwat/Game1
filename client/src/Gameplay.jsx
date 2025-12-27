import { useEffect } from "react";
import Phaser from "phaser";
import config from "./phaser/Main"
import { io } from "socket.io-client";
import { useState, useRef } from "react";
import.meta.env.VITE_API_URL
function GamePlay() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const gameRef=useRef(null)
  // const gameRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Connect to socket
    const newSocket = io(import.meta.env.VITE_API_URL);
    setSocket(newSocket);

    // Listen for chat messages
    newSocket.on("chatMessage2", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("broadcastMessage", (data) => {
      setMessages((prev) => [...prev, { ...data, isBroadcast: true }]);
    });

    return () => {
      newSocket.close();
    };
  }, []);



  const handleSendMessage = () => {
    if (!inputValue.trim() || !socket) return;

    const messageData = {
      id: socket.id,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      username:localStorage.getItem("uname")
    };

    socket.emit("chatMessage", messageData);
    setMessages((prev) => [...prev, { ...messageData, isSelf: true }]);
    setInputValue("");
  };

  const handleBroadcast = () => {
    // if (!inputValue.trim() || !socket) return;

    const messageData = {
      id: socket.id,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    socket.emit("broadcastMessage", messageData);
    setMessages((prev) => [...prev, { ...messageData, isSelf: true, isBroadcast: true }]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  useEffect(() => {
    const game = new Phaser.Game(config);
    gameRef.current=game

    return () => {
      game.destroy(true);
        gameRef.current = null;
    };
  }, []);

  return (
 <div style={{ display: "flex", height: "100vh", backgroundColor: "#1a1a1a" }}>
      {/* Left side - Game and Chat Input */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        {/* Game Container */}
        <div
          id="phaser-container"
          style={{
            width: "100%",
            maxWidth: "1060px",
            height: "600px",
            margin: "0 auto",
            border: "2px solid #333",
            borderRadius: "8px",
            overflow: "hidden"
          }}
        />

        {/* Chat Input */}
        <div style={{
          width: "100%",
          maxWidth: "1060px",
          margin: "20px auto 0",
          display: "flex",
          gap: "10px"
        }}>
          <input
      onFocus={() => {
    if (gameRef.current) {
      // Completely disable Phaser keyboard input and captures
      gameRef.current.input.keyboard.enabled = false;
    }
  }}
  onBlur={() => {
    if (gameRef.current) {
      // Re-enable Phaser keyboard input when clicking away
      gameRef.current.input.keyboard.enabled = true;
    }
  }}
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "14px",
              border: "2px solid #333",
              borderRadius: "8px",
              backgroundColor: "#2a2a2a",
              color: "#fff",
              outline: "none"
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              backgroundColor: "#4a9eff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send
          </button>
        
        </div>
      </div>

      {/* Right side - Messages */}
      <div style={{
        width: "350px",
        backgroundColor: "#2a2a2a",
        borderLeft: "2px solid #333",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "2px solid #333",
          backgroundColor: "#1f1f1f"
        }}>
          <h2 style={{ margin: 0, color: "#fff", fontSize: "18px" }}>Messages</h2>
        </div>

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px"
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.isSelf ? "#4a9eff" : msg.isBroadcast ? "#ff6b6b" : "#3a3a3a"
              }}
            >
              <div style={{
                fontSize: "11px",
                color: msg.isSelf ? "#e0f0ff" : "#aaa",
                marginBottom: "5px",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>{msg.username||msg.id}</span>
                <span>{msg.timestamp}</span>
              </div>
              <div style={{ color: "#fff", fontSize: "14px" }}>
                {msg.isBroadcast && "📢 "}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
export default GamePlay