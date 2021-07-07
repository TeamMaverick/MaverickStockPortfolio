import React from 'react';

var Article = ({article}) => (
  <div className="box" style={{width:"100%"}}>
    <a href={article.url} target="_blank">{article.headline}</a>
  </div>
)

export default Article;
