import React from 'react'
import Header from './Header'
import axios from 'axios';
import { setPasswordURL } from './config/config.js';
import { resetPasswordURL } from './config/config.js';

export default class SetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordConfirmation: "",
      uuid: window.location.search.split("uuid=")[1].split("&")[0],
      email: window.location.search.split("email=")[1].split("&")[0]
    }

    this.setPassword = this.setPassword.bind(this);
    this.setPasswordConfirmation = this.setPasswordConfirmation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setPassword(event) {
    this.setState({password: event.target.value})
  }

  setPasswordConfirmation(event) {
    this.setState({passwordConfirmation: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    let url;
    if (window.location.pathname.includes("reset")) {
      url = resetPasswordURL;
    } else {
      url = setPasswordURL;
    }
    axios.post(url, {
      user: {
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        uuid: this.state.uuid
      }
    }
    )
    .then((response) => {
      this.props.history.push('/')
    })
    .catch((error) => {
      this.props.history.push('/404')
    })
  }

  render() {
    let headerText;
    if (window.location.pathname.includes("reset")) {
      headerText = "Please set your new password. After setting your new password, you will need to log in again.";
    } else {
      headerText = "Please set your password. After setting your password, you will need to log in."
    }
    return(
      <div className="col-12 col-lg-6 centered-layout">
        <Header content={headerText} />
        <form onSubmit={this.handleSubmit} className="card">
          <div className="input-container">
            <span>Password</span>
            <input type="password" className="input-field" onKeyUp={this.setPassword}/>
          </div>
          <div className="input-container">
            <span>Password Confirmation</span>
            <input type="password" className="input-field" onKeyUp={this.setPasswordConfirmation}/>
          </div>
          <div className="input-container">
            <button type="submit" >Set Password</button>
          </div>
        </form>
      </div>
    )
  }
}
