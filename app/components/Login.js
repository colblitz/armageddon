import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log("Login props: ");
    console.log(this.props);

    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    // this.timer;
    // this.threshold = 1000;
  }

  submitForm() {
    console.log("submit form: ", this.state.email, this.state.password);
    console.log("props in submitForm");
    console.log(this.props);
    var email = this.state.email;
    var password = this.state.password;
    fetch('/login',{
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data => {
          if (data.error) {
            console.log("Got error: " + data.error);
          } else {
            console.log("token: ", data.token);
            console.log("calling email changed");
            this.props.emailChanged(email, data.token);
          }
          // console.log("Successful" + JSON.stringify(data));
          // if (data.successful) {
          //   console.log("successful");



          //   window.location.href = '/schedule'
          //   // console.log("redirect");
          //   // this.props.history.push('/schedule');
          // } else {
          //   console.log("eh");
          // }
        });
    })
  }

  handleChange(event) {
    // console.log("handle change");

    // clearTimeout(this.timer);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // console.log("handle change: ", target, value, name);

    this.setState({
      [name]: value
    });

    // this.timer = setTimeout(this.submitForm, this.threshold);
  }

  handleSubmit(event) {
    console.log("in handle submit");
    console.log(this.state.email);
    console.log(this.state.password);
    // alert(this.state.username)
    event.preventDefault();
    this.submitForm();
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} method="post">
          <div className="login-field">
            <label className="login-label" htmlFor="usernameOrEmail">
              Email address:
              <input
                className="login-input"
                id="email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </label>
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Password:
              <input
                className="login-input"
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="login-field">
            <button className="login-button" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;