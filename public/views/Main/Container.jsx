import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Container = (props) => {
  let children = null;
  if(props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth,
    });
  }
  return (
    <Jumbotron>
      <h2 >
        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
      </h2>
      {children}
    </Jumbotron>
  );
};

export default Container;

// export class Container extends React.Component {
//   render() {
//     let children = null;
//     if (this.props.children) {
//       children = React.cloneElement(this.props.children, {
//         auth: this.props.route.auth // sends auth instance from route to children
//       });
//     }

//     return (
//       <Jumbotron>
//         <h2 >
//           <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
//         </h2>
//         {children}
//       </Jumbotron>
//     );
//   }
// }
