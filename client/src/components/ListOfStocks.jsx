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
  componentDidMount() {
    this.setState({
      dirTic: false
    })
  }

  render() {
    let { stocksArray, removeStock, getStocks, downloadCSV, downloadPDF, displayStock, portfolioTotal, todaysChange, changeSort, sortBy } = this.props;
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
                    dirTic: !this.state.dirTic
                  })
                  changeSort('stock_ticker')
                }
              }>
                <abbr title="Position">Ticker
                {sortBy==='stock_ticker' && !this.state.dirTic && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='stock_ticker' && this.state.dirTic && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
              <th onClick={
                ()=>{
                  getStocks('company_name', null, this.state.dirNam)
                  this.setState({
                    dirNam: !this.state.dirNam
                  })
                  changeSort('company_name')
                }
              }>
                <abbr title="Position">Name
                {sortBy==='company_name' && !this.state.dirNam && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='company_name' && this.state.dirNam && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
              <th onClick={
                ()=>{
                  getStocks('quantity', null, this.state.dirQua)
                  this.setState({
                    dirQua: !this.state.dirQua
                  })
                  changeSort('quantity')
                }
              }>
                <abbr title="Position">Quantity
                {sortBy==='quantity' && !this.state.dirQua && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='quantity' && this.state.dirQua && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
              <th onClick={
                ()=>{
                  getStocks('price', null, this.state.dirPri)
                  this.setState({
                    dirPri: !this.state.dirPri
                  })
                  changeSort('price')
                }
              }>
                <abbr title="Position">Price($)
                {sortBy==='price' && !this.state.dirPri && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='price' && this.state.dirPri && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
              <th onClick={
                ()=>{
                  getStocks('price', null, this.state.dirHol)
                  this.setState({
                    dirHol: !this.state.dirHol
                  })
                  changeSort('price')
                }
              }>
                <abbr title="Position">Holdings($)
                {sortBy==='holdings' && !this.state.dirHol && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='holdings' && this.state.dirHol && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
              <th onClick={
                ()=>{
                  getStocks('change', null, this.state.dirTod)
                  this.setState({
                    dirTod: !this.state.dirTod
                  })
                  changeSort('change')
                }
              }>
                <abbr title="Position">Today's Change($)
                {sortBy==='change' && !this.state.dirTod && <span><i className="fas fa-angle-up" style={{marginLeft:'5px'}}></i></span>}
                {sortBy==='change' && this.state.dirTod && <span><i className="fas fa-angle-down" style={{marginLeft:'5px'}}></i></span>}
                </abbr>
              </th>
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
