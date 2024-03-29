import React, { useState } from 'react';
import { dbService, storageService } from 'firebaseInstance';

function Message({ messageObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(messageObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('메세지를 삭제하시겠습니까?');
    const imgUrl = messageObj.attachmentUrl;
    if (ok) {
      await dbService.collection('messages').doc(`${messageObj.id}`).delete();
      imgUrl &&
        (await storageService.refFromURL(messageObj.attachmentUrl).delete());
    }
  };

  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  const onEditChange = (e) => {
    const { value } = e.target;
    setNewMessage(value);
  };

  const onEditMessageSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`messages/${messageObj.id}`).update({
      text: newMessage,
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onEditMessageSubmit}>
            <input
              type='text'
              placeholder='Edit your message'
              value={newMessage}
              onChange={onEditChange}
              required
            />
            <input type='submit' value='Update' />
          </form>
          <button onClick={toggleIsEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{messageObj.text}</h4>
          {messageObj.attachmentUrl && (
            <img src={messageObj.attachmentUrl} width='200px' />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Message</button>
              <button onClick={toggleIsEditing}>Edit Message</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Message;
