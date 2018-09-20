import React from 'react';
import Peer from './Peer.jsx';

const Peers = ({ peers }) => (
  <div>
    <h2 className="subtitle">Peer Stocks</h2>
    <div className="columns border">
      {peers ? 
        (peers.map((peer, idx) => (<Peer key={idx} stock={peer}/>))) :
        (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </div>
  </div>
)


export default Peers;