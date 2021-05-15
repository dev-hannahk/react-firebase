import Message from 'components/Message';
import { dbService } from 'firebaseInstance';
import React, { useState, useEffect } from 'react';

function Home({ userObj }) {
  const [message, setMessage] = useState('');
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('messages').add({
      text: message,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setMessage('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Send a message'
          maxLength={120}
          onChange={onChange}
          value={message}
        />
        <input type='submit' value='Send' />
      </form>
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
