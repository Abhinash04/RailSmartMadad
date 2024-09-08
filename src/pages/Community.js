import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faUser } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../components/Dashboard';
import ScrollToTop from '../components/ScrollToTop';
import ChatBotIcon from '../components/ChatBotIcon';

const Community = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "What kind of assistance can RailBot provide?",
      author: {
        name: "Abhinash",
        avatar: <FontAwesomeIcon icon={faUser} />,
      },
      createdAt: "2024-09-01T12:34:56Z",
      replies: [
        {
          id: 1,
          content: "RailBot is designed to help you with a variety of rail-related queries. It can provide real-time train schedules, assist with booking and ticketing, and offer information on delays or cancellations. Additionally, RailBot can help you find station amenities and answer general questions about rail services.",
          author: {
            name: "Sambhav",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-09-01T12:40:00Z",
          upvotes: 15,
          downvotes: 2,
          isBestAnswer: true,
        },
        {
          id: 2,
          content: "RailBot can assist you in numerous ways, including checking train arrival and departure times, guiding you through the ticket purchasing process, and providing updates on train delays or platform changes. If you need help with travel plans or station facilities, RailBot is also here to assist.",
          author: {
            name: "Abhipsa",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-09-01T12:45:30Z",
          upvotes: 8,
          downvotes: 1,
        },
        {
          id: 3,
          content: "With RailBot, you can get help with planning your journey, including finding the best routes and schedules. It can also help with purchasing tickets, checking for real-time updates, and providing information about any disruptions or changes in your travel itinerary.",
          author: {
            name: "Priona",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-09-01T13:00:00Z",
          upvotes: 12,
          downvotes: 0,
        },
      ],
    },
    {
      id: 2,
      title: "What are the features of the Rail Madad web application?",
      author: {
        name: "Smaranika",
        avatar: <FontAwesomeIcon icon={faUser} />,
      },
      createdAt: "2024-08-30T09:15:20Z",
      replies: [
        {
          id: 1,
          content: "The Rail Madad web application offers several key features to enhance your rail travel experience. It provides real-time updates on train schedules, allows you to file complaints or requests for assistance, and offers a platform to track the status of your grievances. Additionally, it provides information on train delays and cancellations and helps you connect with relevant railway authorities.",
          author: {
            name: "Abhinash",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-08-30T09:20:00Z",
          upvotes: 20,
          downvotes: 1,
          isBestAnswer: true,
        },
        {
          id: 2,
          content: "The Rail Madad web application is equipped with features such as the ability to lodge and monitor complaints, access to real-time train status updates, and detailed information on service disruptions. It also provides a streamlined way to contact railway officials and manage your travel-related concerns efficiently.",
          author: {
            name: "Priona",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-08-30T09:30:45Z",
          upvotes: 15,
          downvotes: 0,
        },
      ],
    },
    {
      id: 3,
      title: "How can I file a complaint using Rail Madad?",
      author: {
        name: "Akanksha",
        avatar: <FontAwesomeIcon icon={faUser} />,
      },
      createdAt: "2024-09-02T08:00:00Z",
      replies: [
        {
          id: 1,
          content: "Filing a complaint with Rail Madad is straightforward. Start by logging into the Rail Madad web application or mobile app. Navigate to the 'File a Complaint' section and enter the required information, including your train details and a brief description of your grievance. After submitting the complaint, you will receive a reference number to track its progress and get updates on the resolution.",
          author: {
            name: "Abhinash",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-09-02T08:10:00Z",
          upvotes: 18,
          downvotes: 2,
          isBestAnswer: true,
        },
        {
          id: 2,
          content: "To file a complaint using Rail Madad, first visit the Rail Madad website or open the mobile app. Look for the 'Submit Complaint' or 'Grievance' option on the main menu. Fill out the complaint form with the necessary details, such as your train number, date of travel, and a description of the issue. Once submitted, you can track the status of your complaint through the application.",
          author: {
            name: "Sambhav",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: "2024-09-02T08:20:30Z",
          upvotes: 12,
          downvotes: 1,
        },
      ],
    },
  ]);

  const [newThread, setNewThread] = useState("");
  const [newReply, setNewReply] = useState("");
  const [currentThreadId, setCurrentThreadId] = useState(null);

  const handleSubmitThread = () => {
    if (newThread.trim() !== "") {
      setThreads([
        ...threads,
        {
          id: threads.length + 1,
          title: newThread,
          author: {
            name: "You",
            avatar: <FontAwesomeIcon icon={faUser} />,
          },
          createdAt: new Date().toISOString(),
          replies: [],
        },
      ]);
      setNewThread("");
    }
  };

  const handleReply = (threadId) => {
    setCurrentThreadId(threadId);
  };

  const handleSubmitReply = () => {
    if (newReply.trim() !== "") {
      const updatedThreads = threads.map((thread) => {
        if (thread.id === currentThreadId) {
          return {
            ...thread,
            replies: [
              ...thread.replies,
              {
                id: thread.replies.length + 1,
                content: newReply,
                author: {
                  name: "You",
                  avatar: <FontAwesomeIcon icon={faUser} />,
                },
                createdAt: new Date().toISOString(),
                upvotes: 0,
                downvotes: 0,
              },
            ],
          };
        }
        return thread;
      });
      setThreads(updatedThreads);
      setNewReply("");
      setCurrentThreadId(null);
    }
  };

  const handleUpvote = (threadId, replyId) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: thread.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                upvotes: reply.upvotes + 1,
              };
            }
            return reply;
          }),
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handleDownvote = (threadId, replyId) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: thread.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                downvotes: reply.downvotes + 1,
              };
            }
            return reply;
          }),
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handleMarkBestAnswer = (threadId, replyId) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: thread.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                isBestAnswer: true,
              };
            } else {
              return {
                ...reply,
                isBestAnswer: false,
              };
            }
          }),
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handlePinBestAnswer = (threadId, replyId) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [
            ...thread.replies.map((reply) => ({
              ...reply,
              isBestAnswer: reply.id === replyId,
            }))
          ].sort((a, b) => b.isBestAnswer - a.isBestAnswer),
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  return (
    <div id="community" style={{ color: '#762626' }}>
      <div className="mx-auto max-w-7xl px-2 py-10 md:px-0">
        <div className="head mt-[100px]">
          <span id="sub-heading" className="animate-pulse text-center">RAIL MADAD</span>
          <span id="heading" className="text-center block text-4xl font-bold">COMMUNITY</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto mt-4">
            <Dashboard/>
            {threads.map((thread) => (
              <div key={thread.id} className="bg-background rounded-lg shadow-sm mb-6 mt-4" style={{ border: '2px solid #762626' }}>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 mr-4">
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                        {thread.author.avatar}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-1">{thread.title}</h2>
                      <p className="text-sm text-gray-500">by {thread.author.name} on {new Date(thread.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {thread.replies.map((reply) => (
                    <div key={reply.id} className="p-4 bg-gray-100 rounded-lg mb-4">
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 mr-4">
                          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                            {reply.author.avatar}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm mb-1">{reply.content}</p>
                          <p className="text-xs text-gray-500">by {reply.author.name} on {new Date(reply.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          onClick={() => handleUpvote(thread.id, reply.id)}
                          className="cursor-pointer"
                          style={{ marginRight: '10px', color: '#D88080' }}
                        />
                        <span>{reply.upvotes}</span>

                        <FontAwesomeIcon
                          icon={faThumbsDown}
                          onClick={() => handleDownvote(thread.id, reply.id)}
                          className="cursor-pointer"
                          style={{ marginLeft: '20px', marginRight: '10px', color: '#D88080' }}
                        />
                        <span>{reply.downvotes}</span>

                        {reply.isBestAnswer ? (
                          <span className="text-green-600 font-medium" style={{ marginLeft: '20px' }}>Best Answer</span>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleMarkBestAnswer(thread.id, reply.id)}
                            style={{ backgroundColor: '#762626', marginLeft: '20px' }}
                          >
                            Mark as Best Answer
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="p-6">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReply(thread.id)}
                      style={{ backgroundColor: '#762626' }}
                    >
                      Reply
                    </button>
                    {currentThreadId === thread.id && (
                      <div className="mt-4">
                        <textarea
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmitReply}
                            style={{ backgroundColor: '#762626' }}
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-6 p-6 bg-background rounded-lg shadow-sm" style={{ border: '2px solid #762626' }}>
              <h2 className="text-xl font-medium mb-4">Ask a Question</h2>
              <textarea
                value={newThread}
                onChange={(e) => setNewThread(e.target.value)}
                placeholder="Write your question..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <button
                className="btn btn-primary"
                onClick={handleSubmitThread}
                style={{ backgroundColor: '#762626' }}
              >
                Submit Question
              </button>
            </div>
            <ScrollToTop />
            <ChatBotIcon />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;