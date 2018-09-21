import React from 'react';
import Chat from './Chat.jsx';
import EachChat from './EachChat.jsx';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000')

class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    let allMessages = [...this.state.messages]
    socket.on('chat', (data) => {
      allMessages.push(data);
      this.setState(() => ({
        messages: allMessages
      }))
    })
  }

  render() {
    return(
      <div id="chat">
        <EachChat messages={this.state.messages}/>
        <Chat user={this.props.user}/>
      </div>
    )
  }
}

export default MessageBox