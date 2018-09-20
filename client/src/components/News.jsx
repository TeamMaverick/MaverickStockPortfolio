import React from 'react';
import Article from './Article.jsx';

var News = ({news}) => (
  <div className="border" style={{marginBottom: "80px"}}>
    <h2 className="subtitle">News Articles</h2>
    {news ? (news.map((article, idx) => (<Article key={idx} article={article}/>))) 
          : (<img className="spinner" style={{alignContent: 'center'}}/>)}
  </div>
)

export default News;
