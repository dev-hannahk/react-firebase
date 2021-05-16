import Message from 'components/Message';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'firebaseInstance';
import React, { useState, useEffect } from 'react';

function Home({ userObj }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [attachment, setAttachment] = useState('');

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
    let attachmentUrl = '';
    if (attachment !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const messageObj = {
      text: message,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('messages').add(messageObj);
    setMessage('');
    setAttachment('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const { result } = e.currentTarget;
      setAttachment(result);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment('');

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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Send' />
        {attachment && (
          <div>
            <img src={attachment} width='200px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
