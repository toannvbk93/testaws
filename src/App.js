import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AWSToannv from './aws/aws-toannv';
class App extends Component {
  toanv: any;
  constructor(props) {
    super(props);
    this.toannv = new AWSToannv();
    this.state = {
      username: '',
      name: '',
      email: '',
      password: ''
    }
  }
  handleClick(event) {
    var payload = {
      "username": this.state.username,
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password
    }
    console.log(payload);
    this.toannv.signup(payload.username, payload.name, payload.email, payload.password);
  }
  // 
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Signup"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your name"
              floatingLabelText="Name"
              onChange={(event, newValue) => this.setState({ name: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
        {/* <p>{this.toannv.signup()}</p> */}
        {/* <p>{this.toannv.authenUser()}</p> */}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
