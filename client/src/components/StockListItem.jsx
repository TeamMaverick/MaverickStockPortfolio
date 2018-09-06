import React from 'react';

//individual item in the list of saved stocks
var StockListItem = function({ stock, displayStock }) {
  //displayStock here is the clickhandler function defined in the app that makes a get request
  //to get the data for that particular stock and deposits it in the app's state
  return (
    <div className="StockListItem">
      <div onClick={() => displayStock(stock.ticker)}>
        {`${stock.ticker} : ${stock.quantity} : 
        ${stock.price} : ${stock.price * stock.quantity}`}
      </div>
      <input className="checkedStock" value={stock.ticker} type="checkbox" />
    </div>
  );
};

export default StockListItem;
