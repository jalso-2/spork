import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({ username, person, clickHandler }) => (
  <div>
    <input type="checkbox" name={username} onClick={clickHandler} />
    <h4>{person}</h4>
  </div>);

export default Friend;

Friend.propTypes = {
  person: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

