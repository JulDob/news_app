import React, { useState, useEffect } from 'react';
import Preview from '../Preview';
import s from './index.module.css';
import QueryHandler from '../../api';

function ArticleListTop() {
  const [articles, setArticles] = useState([]);

  const handleError = () => {};
  const limit = 4;
  const getLatestArticles = async () => {
    try {
      const articlesList = await QueryHandler.fetchLatestArticles(limit);
      setArticles(() => [...articlesList.data]);
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    getLatestArticles();
  }, []);

  return (
    <ul className={s.articleList}>
      {articles.map((article) => (
        <li key={article.id}>
          <Preview article={article} type="thumbnail" />
        </li>
      ))}
    </ul>
  );
}

export default ArticleListTop;
