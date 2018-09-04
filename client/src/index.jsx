import React from 'react';
import ReactDOM from 'react-dom';
import axois from 'axios';


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

    };

  }
  componentDidMount(){
  }
  
  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Stock Portfolio</h1></header> 
        <div className="main">
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));