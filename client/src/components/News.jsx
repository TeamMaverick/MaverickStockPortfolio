import React from 'react';
import Article from './Article.jsx';

var News = ({news}) => (
  <div style={{marginBottom: "80px", float: "center", width:"100%"}}>
    <h2 className="subtitle">News Articles</h2>
      {news ? (news.map((article, idx) => (<Article key={idx} article={article}/>))) 
            : (<img className="spinner" style={{alignContent: 'center'}}/>)}
  </div>
)

export default News;
