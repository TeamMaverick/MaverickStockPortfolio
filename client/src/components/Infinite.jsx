import React from 'react'
import axios from 'axios'
import Marquee from './Marquee.jsx'

class Infinite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stocks: []
        }
    }

    componentDidMount() {
        axios.get('/api/banner')
            .then(({data}) => this.setState({
                stocks: data
            }))
            .catch((err) => console.error(err ))
    }

    render() {
        return (
          <div className="scroller">
            <Marquee loop={true} leading={0} hoverToStop={true} text=
              {this.state.stocks.map((stock, i) => 
                <span key={i}>
                  |    {stock.symbol}    
                  <span>
                      <i className={
                        stock.changePercent > 0 
                          ? "fas fa-arrow-up green" 
                                : "fas fa-arrow-down red"} /> 
                        </span>
                                <span>
                                    ({(stock.changePercent * 100).toFixed(2)})%     |
                                </span>
                            </span>)}
                ></Marquee>
            </div>
        )
    }
}

export default Infinite;