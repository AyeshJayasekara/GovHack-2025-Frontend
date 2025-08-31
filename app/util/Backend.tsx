import axios from 'axios';

const API_URL = 'http://138.80.117.126:8080/ask';

interface ChatResponse {
    text: string;
    id: string;
    from: string;
}

export const sendChat = async (message: string): Promise<ChatResponse> => {
    try {
    let chat_response = await axios.post(API_URL, 
        { question: message },
        {
            headers: { "Content-Type": "application/json" }
        }
    );

        return chat_response.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return {id: (Date.now() + 1).toString(), from: "bot", text: "Something went wrong! Try again later."};
    }
};