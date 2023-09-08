import PropTypes from "prop-types"

export default{
      book: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      isbn: PropTypes.string,
      belongsTo: PropTypes.string,
      starsAndNumberOfVotes: PropTypes.array,
      pictureUrl: PropTypes.string,
      pictureDesc: PropTypes.string,
      language: PropTypes.string,
      published: PropTypes.number,
      description: PropTypes.string,
    }),
  };