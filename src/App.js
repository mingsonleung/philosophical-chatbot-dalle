import "./App.css";
import robotLogo from "./assets/robot-logo.png";
import restartBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import homeIcon from "./assets/home.svg";
import savedIcon from "./assets/bookmark.svg";
import rocketIcon from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import robotIcon from "./assets/robot-icon.png";
import { getChatCompletion } from "./chat";
import { generateImage } from "./image";
import { useState, useEffect, useRef } from "react";

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am an AI-powered philosopher. I cannot give you answers, but I can provide insight on anything you send! I typically do better when your messages have more detail. 😊",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    setIsBotTyping(true);
    const res = await getChatCompletion(text);
    const img = await generateImage(res);
    setImageData(img);
    setIsBotTyping(false);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true, image: img },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    setIsBotTyping(true);
    const res = await getChatCompletion(text);
    setIsBotTyping(false);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={robotLogo} alt="website logo" className="logo" />
            <span className="brand">Philosophical Chatbot</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={restartBtn} alt="new chat icon" className="restartBtn" />
            Restart Chat
          </button>
          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value={"What is the meaning of life?"}
              disabled={isBotTyping}
            >
              <img src={msgIcon} alt="query" />
              What is the meaning of life?
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={"What is happiness?"}
              disabled={isBotTyping}
            >
              <img src={msgIcon} alt="query" />
              What is happiness?
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={"Is free will real?"}
              disabled={isBotTyping}
            >
              <img src={msgIcon} alt="query" />
              Is free will real?
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={
                "What is love? Use a quote from Haddaway and reference his song."
              }
              disabled={isBotTyping}
            >
              <img src={msgIcon} alt="query" />
              What is love?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="lowerSideContainer">
            <a href="https://github.com/mingsonleung" className="listItems">
              <div className="listItems">
                <img src={homeIcon} alt="Home" className="listItemsImg" />
                Home
              </div>
            </a>
            <a href="https://github.com/mingsonleung" className="listItems">
              <div className="listItems">
                <img src={savedIcon} alt="Saved" className="listItemsImg" />
                Saved
              </div>
            </a>
            <a href="https://github.com/mingsonleung" className="listItems">
              <div className="listItems">
                <img src={rocketIcon} alt="Upgrade" className="listItemsImg" />
                Upgrade
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatImg"
                src={message.isBot ? robotIcon : userIcon}
                alt="user icon"
              />
              <div className="txt">
                <p>{message.text}</p>
                {message.image && <img src={message.image} alt="Generated image" />}
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="chat bot">
              <img className="chatImg" src={robotIcon} alt="user icon" />
              <p className="txt">Typing...</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              id="user-input"
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              disabled={isBotTyping}
            />
            <button
              className="send"
              onClick={handleSend}
              disabled={isBotTyping}
            >
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>
            Philosophical Chatbot may produce inaccurate information about people,
            places, or facts. Current version uses OpenAI's "gpt-3.5-turbo"
            model.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
