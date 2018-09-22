import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeCheckedBoxes, portfolioTotal, getStocks, toggleModal }) {
  return (
    <div className="listOfStocks">
      <h1 className="healthCheckHeader">Portfolio</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>
              <div className="level-item has-text-centered">
                <p className="heading">Symbol</p>
              </div>
            </th>
            <th >
              <div className="level-item has-text-centered">
                <p className="heading">Current Price</p>
              </div>
            </th>
            <th >
              <div className="level-item has-text-centered">
                <p className="heading"><b>Quantity</b></p>
              </div>
            </th>
            <th >
              <div className="level-item has-text-centered">
                <p className="heading">Total</p>
              </div>
            </th>
            <th >
              <div className="level-item has-text-centered">
                <p className="heading">Sell</p>
              </div>
            </th>
          </tr>
          {stocksArray ? stocksArray.map((stock) => {
            return <StockListItem stock={stock} key={stock.stock_ticker} getStocks={getStocks} toggleModal={toggleModal}/>;
          }) : ''}
        </tbody>
      </table>
          <div className="totalprice">Portfolio Total : ${Number.parseFloat(portfolioTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    </div>
  );
};

export default ListOfStocks;
