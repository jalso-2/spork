import React from 'react';

const Need = props => (
  <div>
    <input type="checkbox" data-need={props.need} onClick={props.removeNeedClick} />
    <h4>{props.need}</h4>
  </div>
);

export default Need;
