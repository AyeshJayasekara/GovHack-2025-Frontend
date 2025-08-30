"use client";
import ChatBot, { Params } from "react-chatbotify";

export default function MyChatBot() {
  const flow = {
    start: {
      message: "👋 Hi, I’m your Governemnt chatbot! What would you like to do?",
      path: "continue",
    },
    continue: {
      message: async (params: Params) => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: params.userInput }),
          });
          const data = await response.json();
          return data.title;
        } catch (error) {
          console.error("Error fetching help response:", error);
          return "Sorry, I couldn't find an answer to your question.";
        }
      },
      path: "InitialStep",
    }
  };
  return <ChatBot flow={flow} />;
}
