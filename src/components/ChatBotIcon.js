import React from 'react';
import { BsChatDots } from "react-icons/bs";

const ChatBotIcon = () => {
  return (
    <a
      href="https://railbot-alpha.vercel.app/" // Replace with your chatbot application URL
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 bg-[#762626] text-white rounded-full p-2 text-2xl z-[1000] border border-black transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#D88080]"
    >
      <BsChatDots />
    </a>
  )
}

export default ChatBotIcon;