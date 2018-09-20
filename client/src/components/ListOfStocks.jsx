import React from 'react';
import StockListItem from './StockListItem.jsx';

//List component that displays all the stocks the user has saved
var ListOfStocks = function({ stocksArray, removeStock, getStocks, downloadCSV, downloadPDF, displayStock, portfolioTotal }) {
  return (
    <div className="listOfStocks" style={{paddingLeft: '10%', paddingBottom: '5%'}}>
      <table className="table is-hoverable">
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
        <tfoot>
          <tr>
            <th>
              <span className="exporter icon is-large has-text-success" onClick={downloadCSV}>
                <i className="fas fa-lg fa-file-excel" style={{marginRight:'20px'}}></i>
              </span>
              <span className="exporter icon is-large has-text-danger" onClick={downloadPDF}>
                <i className="fas fa-lg fa-file-pdf" style={{marginRight:'60px'}}></i>
              </span>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th><abbr title="Position">TOTAL</abbr></th>
            <th>              
              ${Number.parseFloat(portfolioTotal)
                .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </th>
            <th>$ </th>
            <th>$ </th>   
          </tr> 
        </tfoot>  
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
