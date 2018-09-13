import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeCheckedBoxes, portfolioTotal, getStocks }) {
  return (
    <div className="listOfStocks">
      <span className="head">List of stocks in portfolio:</span>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="heading" />
          </div>
          <div className="level-item has-text-centered">
            <p className="heading">Symbol</p>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item has-text-centered">
            <p className="heading">Quantity</p>
          </div>
        </div>
      </div>
      {stocksArray.length ? stocksArray.map((stock) => {
        return <StockListItem stock={stock} key={stock.stock_ticker} getStocks={getStocks} />;
      }) : ''}
      <div className="total price">Portfolio Total : {portfolioTotal}</div>
      <button className="button" onClick={(evt) => removeCheckedBoxes(evt)}>
        Remove Checked Stocks
      </button>
    </div>
  );
};

export default ListOfStocks;
