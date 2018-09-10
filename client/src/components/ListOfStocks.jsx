import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeCheckedBoxes, displayStock, calculateTotal }) {
  return (
      <div className="section">
        {stocksArray.map((stock) => {
          return <StockListItem stock={stock} key={stock.ticker} displayStock={displayStock} />;
        })}
        <div className="total price">Total : {calculateTotal(stocksArray)}</div>
        <button className="button" onClick={(evt) => removeCheckedBoxes(evt)}>Remove Checked Stocks</button>
      </div>
  );
};

export default ListOfStocks;
