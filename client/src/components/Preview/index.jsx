import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Comment from '../Comment/index';
import articlePropType from '../../proptypes/article';
import s from './index.module.css';

const getSpoilerText = (text) => {
  const MAX_SPOILER_LENGTH = 100;
  if (text.length <= MAX_SPOILER_LENGTH) return text;

  const spoilerSpaceIndex = text.indexOf(' ', MAX_SPOILER_LENGTH);

  return `${text.substring(0, spoilerSpaceIndex)}...`;
};

function Preview({ article, type }) {
  const { spoiler } = article;

  const shortSpoiler = getSpoilerText(spoiler);
  return (
    <div className={cn({ [s[type]]: !!type })}>
      <div
        className={cn(s.pictureWrapper, {
          [s.pictureWrapperFull]: type === 'full',
          [s.pictureWrappeThumbnail]: type === 'thumbnail',
        })}
      >
        <img className={s.picture} src={article.picture} alt={article.title} />
      </div>
      <div className={s.textBlock}>
        <div className={s.textBlockTitle}>
          <Link to={`${article.categoryId}`} className={s.link}>
            {article.category?.title}
          </Link>
          <Link to={`${article.categoryId}/${article.id}`} className={s.comment}>
            <Comment count={article.comments} />
          </Link>
        </div>
        <Link to={`${article.categoryId}/${article.id}`} className={s.title}>
          {article.title}
        </Link>
        <p className={s.spoiler}>
          {type === 'full' ? article.spoiler : shortSpoiler}
          {type === 'full' && (
            <Link to={`${article.categoryId}/${article.id}`} className={s.articleLink}>
              [More...]
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

Preview.propTypes = {
  article: PropTypes.shape(articlePropType).isRequired,
  type: PropTypes.oneOf(['full', 'thumbnail']),
};

Preview.defaultProps = {
  type: 'full',
};

export default Preview;
