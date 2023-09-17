import PropTypes from 'prop-types';

export default {
  id: PropTypes.number,
  category: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  spoiler: PropTypes.string,
  picture: PropTypes.string,
  comments: PropTypes.number,
  url: PropTypes.string,
};
