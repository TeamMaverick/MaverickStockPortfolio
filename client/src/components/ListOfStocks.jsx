import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeStock, getStocks, downloadCSV, downloadPDF, displayStock }) {
  return (
    <div className="listOfStocks">
      <table className="table">
        <thead>
          <tr>
            <th><abbr title="Position"></abbr></th>
            <th><abbr title="Position">Ticker</abbr></th>
            <th><abbr title="Position">Name</abbr></th>
            <th><abbr title="Position">Quantity</abbr></th>
            <th><abbr title="Position">Price</abbr></th>
            <th><abbr title="Position">Holdings</abbr></th>
            <th><abbr title="Position">Today's Change</abbr></th>
            <th><abbr title="Position">YTD Change</abbr></th>            
          </tr>
        </thead>
        <tbody>
          {stocksArray.length ? stocksArray.map((stock) => {
            return <StockListItem stock={stock} key={stock.stock_ticker} getStocks={getStocks} removeStock={removeStock} displayStock={displayStock}/>;
          }) : null}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfStocks;
