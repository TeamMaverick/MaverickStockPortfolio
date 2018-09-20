import React from 'react';

var Article = ({article}) => (
  <div className="box">
    <a href={article.url} target="_blank">{article.headline}</a>
  </div>
)

export default Article;
