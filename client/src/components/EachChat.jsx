import React from 'react'

const EachChat = ({messages}) => {
  return (
    <div id='chat-window'>
      {messages.map((message) => <p id="output"><strong>{message.handle}: </strong>{message.chat}</p>)}
    </div>
  )
}

export default EachChat;