import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import AuthService from '../../../utils/AuthService';

<<<<<<< HEAD
export class Login extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar >
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}
=======
const Login = (props) => {
  const { auth } = props;
  return (
    <div>
      <h2>Login</h2>
      <ButtonToolbar >
        <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
      </ButtonToolbar>
    </div>
  );
};


export default Login;

// export class Login extends React.Component {
//   render() {
//     const { auth } = this.props
//     return (
//       <div>
//         <h2>Login</h2>
//         <ButtonToolbar >
//           <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
//         </ButtonToolbar>
//       </div>
//     )
//   }
// }
>>>>>>> d1886140a9a5c0d1dc6c8b03ce2d7afe774203f8
