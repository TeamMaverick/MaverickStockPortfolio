import React from 'react';
import Peer from './Peer.jsx';

const Peers = ({ peers, peersQuotes }) => (
  <div>
    <h2 className="subtitle">Peer Stocks</h2>
    <div className="columns border">
      {peersQuotes ? 
        (peers.map((peer, idx) => (<Peer key={idx} stock={peer} quote={peersQuotes}/>))) :
        (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </div>
  </div>
)


export default Peers;