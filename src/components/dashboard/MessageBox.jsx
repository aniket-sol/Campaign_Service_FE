import { useState, useEffect } from "react";
import { messageAPI } from "../../api/message"; // Replace with actual path to your API function
import MessageModal from "../common/MessageModal";

const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const MAX_PREVIEW_LENGTH = 50;

  // Fetch messages from the backend on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messageAPI.getMessages(); // Replace with your actual API call
        setMessages(response); // Assuming response.data contains the messages array
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false); // Stop loading when the fetch is complete
      }
    };

    fetchMessages();
  }, []); // Empty dependency array ensures it runs only once on mount

  const markAsRead = async (id) => {
    try{
      const response = await messageAPI.updateMessage(id);
      console.log(response);
  
      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, status: "READ" } : msg))
      );
    }catch(err){
      console.log(err);
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (message.status === "UNREAD") {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter((msg) => msg.status === "UNREAD").length;

  const isNewMessage = (date) => {
    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
    return date > oneHourAgo;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4">
        Messages{" "}
        {unreadCount > 0 && (
          <span className="text-blue-600">({unreadCount} new)</span>
        )}
      </h2>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`relative p-4 rounded-lg cursor-pointer transition-colors ${
                message.status === "READ"
                  ? "bg-gray-50"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
              onClick={() => handleMessageClick(message)}
            >
              {/* New message indicator */}
              {isNewMessage(new Date(message.createdAt)) &&
                message.status === "UNREAD" && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}

              <div className="pr-8">
                <p
                  className={`text-sm ${
                    message.status === "READ"
                      ? "text-gray-600"
                      : "text-gray-900"
                  }`}
                >
                  {message.content.length > MAX_PREVIEW_LENGTH
                    ? `${message.content.substring(0, MAX_PREVIEW_LENGTH)}...`
                    : message.content}
                  {message.content.length > MAX_PREVIEW_LENGTH && (
                    <span className="text-blue-600 ml-1">Read more</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage.content}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

export default MessageBox;