import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'firebaseInstance';

function MessageFactory({ userObj }) {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');

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
  );
}

export default MessageFactory;
