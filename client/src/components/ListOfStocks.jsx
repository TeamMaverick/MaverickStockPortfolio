import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeCheckedBoxes, portfolioTotal, getStocks, downloadCSV, downloadPDF }) {
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
      <div className="columns" style={{marginTop: '15px'}}> 
        <div className="column" style={{textAlign: 'center'}}>
          <button className="button" onClick={(evt) => removeCheckedBoxes(evt)}>
            Remove Checked Stocks
          </button>
        </div>
      </div>
      <div className="totalprice" style={{textAlign: 'center', marginTop: '15px', fontWeight: 'bold'}}>Portfolio Total : ${Number.parseFloat(portfolioTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
      <div className="columns" style={{marginTop: '15px'}}> 
        <div className="column" style={{textAlign: 'center'}}>   
          <span className="exporter icon is-large has-text-danger" onClick={downloadPDF}>
            <i className="fas fa-2x fa-file-pdf"></i>
          </span>
        </div>
        <div className="column" style={{textAlign: 'center'}}>
          <span className="exporter icon is-large has-text-success" onClick={downloadCSV}>
            <i className="fas fa-2x fa-file-excel"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListOfStocks;
