import React from 'react';
import StockListItem from './StockListItem.jsx';

class ListOfStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirTic: 'true',
      dirNam: 'true',
      dirQua: 'true',
      dirPri: 'true',
      dirHol: 'true',
      dirTod: 'true',
      dirPor: 'true',
      current: ''
    };
  }
  render() {
    let { stocksArray, removeStock, getStocks, downloadCSV, downloadPDF, displayStock, portfolioTotal, todaysChange } = this.props;
    return (
      <div className="listOfStocks" style={{width: '90%', paddingLeft: '5%', paddingBottom: '5%'}}>
        <table className="table is-hoverable">
          <thead className="head">
            <tr>
              <th><abbr title="Position"></abbr></th>
              <th onClick={
                ()=>{
                  getStocks('stock_ticker', null, this.state.dirTic)
                  this.setState({
                    current: 'ticker',
                    dirTic: !this.state.dirTic
                  })
                }
              }>
                <abbr title="Position">Ticker
                {this.state.current==='ticker' && !this.state.dirTic && <span><i className="fas fa-arrow-up"></i></span>}
                {this.state.current==='ticker' && this.state.dirTic && <span><i className="fas fa-arrow-down"></i></span>}
                </abbr>
              </th>
              <th><abbr title="Position">Name</abbr></th>
              <th><abbr title="Position">Quantity</abbr></th>
              <th><abbr title="Position">Price($)</abbr></th>
              <th><abbr title="Position">Holdings($)</abbr></th>
              <th><abbr title="Position">Today's Change($)</abbr></th>
              <th><abbr title="Position">Portfolio Return($)</abbr></th>            
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th colSpan={2}>
                <span className="exporter icon is-large has-text-success" onClick={downloadCSV}>
                  <i className="fas fa-lg fa-file-excel"></i>
                </span>
                <span className="exporter icon is-large has-text-danger" onClick={downloadPDF}>
                  <i className="fas fa-lg fa-file-pdf"></i>
                </span>
              </th>
              <th></th>
              <th></th>
              <th style={{textDecoration: 'underline'}}>
                TOTAL
              </th>
              <th style={{textDecoration: 'underline'}}>              
                ${Number.parseFloat(portfolioTotal)
                  .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </th>
              <th style={{textDecoration: 'underline', color: portfolioTotal > 0 ? "green" : "red"}}>              
                ${Number.parseFloat(todaysChange)
                  .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} 
              </th>
              <th style={{textDecoration: 'underline', color: portfolioTotal > 0 ? "green" : "red"}}>              
                $-500
              </th>  
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
  }
}

export default ListOfStocks;
