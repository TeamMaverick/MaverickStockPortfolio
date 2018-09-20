import React from 'react';
import Axios from 'axios';

class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={`modal ${this.props.modalOpen  === true ? 'is-active': null}`} >
        <div className="modal-background" onClick={this.props.toggleModal}>
        </div>
        <div className="modal-content">
          <p className="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.toggleModal}></button>
      </div>
    );
  }
}

export default BuySell;
