import React from 'react';
import StockListItem from './StockListItem.jsx';

var ListOfStocks = function(props) {
  return (
    <div>
      {props.stocksArray.map((stock) => {
        return <StockListItem stock={stock} key={stock} displayStock={props.displayStock} />;
      })}
    </div>
  );
};

export default ListOfStocks;
