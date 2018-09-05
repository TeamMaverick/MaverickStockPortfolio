import React from 'react';

var StockListItem = function(props) {
    
    //displayStock here is the clickhandler function defined in the app that makes a get request
    //to get the data for that particular stock and deposits it in the app's state
    return (
        <div className="StockListItem" onClick={()=>(props.displayStock(props.stock))}>
        {props.stock}
        </div>
    )
}

export default StockListItem;