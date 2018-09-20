import openSocket from 'socket.io-client';
import React from 'react';
const socket = openSocket('http://localhost:3000')

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      handle: '',
      chat: '',
      typer: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
 
  componentDidMount() {
    socket.on('typing', data => {
      this.setState({
        typer: data
      })
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      [evt.target.name]: evt.target.value
    })
  }

  handleClick() {
    socket.emit('chat', {
      handle: this.state.handle,
      chat: this.state.chat
    })
    this.setState({
      chat: ''
    })
    this.refs.chat.value = '';
    socket.emit('typing', '');
  }

  handleKeyPress() {
    socket.emit('typing', this.state.handle);
  }

  render(){
    return (
      <div>
        {this.state.typer && <p><em>{this.state.typer} is typing a message...</em></p>}
        <input type="text" id="handle" placeholder="Name" onChange={this.handleChange} name='handle'/>
        <input type="text" id="chat" ref="chat" placeholder="Chat" onChange={this.handleChange} onKeyPress={this.handleKeyPress} name='chat'/>
        <button id="send" onClick={() => {this.handleClick()}} type="submit">Send</button>
      </div>
    )
  }
}

export default Chat