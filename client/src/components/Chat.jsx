import openSocket from 'socket.io-client';
import React from 'react';
const socket = openSocket('http://localhost:3000')

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      [evt.target.name]: evt.target.value
    })
  }

  handleClick(e) {
    e.preventDefault();
    socket.emit('chat', {
      handle: this.props.user.username,
      chat: this.state.chat
    })
    this.setState({
      chat: ''
    })
    this.refs.chat.value = '';
    socket.emit('typing', '');
  }

  handleKeyPress() {
    socket.emit('typing', this.props.user.username);
  }

  render(){
    return (
      <div>
        {this.state.typer && <p><em>{this.state.typer} is typing a message...</em></p>}
        <form type="submit" onSubmit={this.handleClick}>
          <input type="text" id="chat" ref="chat" placeholder="Chat" onChange={this.handleChange} onKeyPress={this.handleKeyPress} name='chat'/>
          <button id="send" type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default Chat