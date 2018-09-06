import React from 'react';

//individual  item in the list of saved stocks
var StockListItem = function(props) {
    
    //displayStock here is the clickhandler function defined in the app that makes a get request
    //to get the data for that particular stock and deposits it in the app's state
    return (
        <div className="StockListItem">
            <div onClick={()=>(props.displayStock(props.stock.ticker))}>
                {props.stock.ticker}{props.stock.quantity}
            </div>
            <input id="checkedStock" value={props.stock.ticker} type="checkbox"></input>
        </div>

    )
}

export default StockListItem;