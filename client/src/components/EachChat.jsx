import React from 'react'

const EachChat = ({messages}) => {
  return (
    <div id='chat-window'>
      {messages.map((message, idx) => <p id="output" key={idx}><strong>{message.handle}: </strong>{message.chat}</p>)}
    </div>
  )
}

export default EachChat;