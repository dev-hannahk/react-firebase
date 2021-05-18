import React, { useState, useEffect } from 'react';
import { dbService } from 'firebaseInstance';
import MessageFactory from 'components/MessageFactory';
import Message from 'components/Message';

function Home({ userObj }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dbService
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messageArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageArray);
      });
  }, []);

  return (
    <div>
      <MessageFactory userObj={userObj} />
      <div>
        {messages.map((message) => (
          <Message
            key={message.id}
            messageObj={message}
            isOwner={message.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
