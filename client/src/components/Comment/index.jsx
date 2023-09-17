import React from 'react';
import PropTypes from 'prop-types';
import s from './index.module.css';
import SvgIcon from '../SvgIcon';

function Comment({ count }) {
  return (
    <div className={s.comments}>
      <SvgIcon size={20} color="#000" name="comments" />
      <span className={s.commentNumber}>{count}</span>
    </div>
  );
}

Comment.propTypes = {
  count: PropTypes.number,
};

Comment.defaultProps = {
  count: 0,
};

export default Comment;
