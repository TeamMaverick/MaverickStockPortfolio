import React from 'react';
import Article from './Article.jsx';

var News = ({currentStock}) => (
  <div style={{marginBottom: "80px", float: "center", width:"100%"}}>
    {currentStock !== undefined && Object.keys(currentStock).length > 0 ? 
        (<h2 className="subtitle">News Articles for {currentStock.quote.companyName}</h2>): (<div></div>)}
      {Object.keys(currentStock).length > 0 ? 
        (currentStock.news.map((article, idx) => 
          (<Article key={idx} article={article}/>))) 
            : (<img className="spinner" style={{alignContent: 'center'}}/>)}
  </div>
)

export default News;
