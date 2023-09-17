import React from 'react';
import PropTypes from 'prop-types';
import Preview from '../Preview';
import s from './index.module.css';
import articlePropType from '../../proptypes/article';

function ArticleList({ articles }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id} className={s.articleItem}>
          <Preview article={article} />
        </li>
      ))}
    </ul>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(articlePropType)).isRequired,
};

export default ArticleList;
