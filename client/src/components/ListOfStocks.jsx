import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function(props) {
  return (
    <div>
      {props.stocksArray.map((stock) => {
        return <StockListItem stock={stock} key={stock.ticker} displayStock={props.displayStock} />;
      })}
    </div>
  );
};

export default ListOfStocks;
