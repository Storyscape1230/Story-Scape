import PropTypes from 'prop-types';

export const FloatingCrossPropTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

export const BlogPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  adminName: PropTypes.string.isRequired,
  blogImage: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
});

export const CardPropTypes = {
  blog: BlogPropTypes.isRequired,
  index: PropTypes.number.isRequired
}; 