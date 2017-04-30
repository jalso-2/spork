import React from 'react';

const Friend = props => (
  <div>
    <input type="checkbox" onClick={props.clickHandler} />
    <h4>{props.username}</h4>
  </div>
);
 export default Friend;