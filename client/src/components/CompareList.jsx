import React from 'react'
import CompareListItem from './CompareListItem.jsx'

var CompareList = function(props) {
  {console.log(props.user)}
  return (
    <div className="container">
      <button className="button compare" onClick={() => props.setView('search')}>Back to Search</button>
      <div className="columns">
        {props.stocks &&
          <React.Fragment>
            {props.stocks.map((stock, i) => (
              <CompareListItem user={props.user} stock={stock} key={i} getPortfolioHoldings={props.getPortfolioHoldings} changeView={props.changeView}/>
            ))}
          </React.Fragment>}
      </div>
    </div>
  )
}

export default CompareList;