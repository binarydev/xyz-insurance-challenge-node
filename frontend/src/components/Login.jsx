import React, { Component } from 'react'
import { FormGroup, FormControl, ListGroup, ListGroupItem, Col, Row, Grid, Button } from 'react-bootstrap'
import TextEncryption from '../isomorphicUtilities/TextEncryption'
import { DoubleBounce } from 'better-react-spinkit'
import autoBind from 'react-autobind'
import 'styles/Login.css'
import 'styles/SharedStyles.css'

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      errors: [],
      loading: false,
      email: '',
      password: ''
    }
    autoBind(this)
  }

  getValidationState(){
    return this.state.errors.length === 0 ? 'success' : 'error'
  }

  onEmailChange(evt){
    this.setState({ email: evt.target.value })
  }

  onPasswordChange(evt){
    this.setState({ password: evt.target.value })
  }

  encryptPassword(){
    return TextEncryption.encrypt(this.state.password)
  }

  loginUser(){
    this.setState({ loading: true })
    let params = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          pass: this.encryptPassword()
        }
      }),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    fetch('/users/login', params).then((response)=>{
      this.setState({ loading: false })
      if(response.ok){
        return response.json()
      }else{
        throw new Error("User with these credentials not found")
      }
    }).then((user) =>{
      this.props.setUser(user)
    }).catch((err) => {
      this.setState({errors: [err.message]})
    });
  }

  errorList(){
    return (
      <ListGroup>
        {
          this.state.errors.map((err, index)=>{
          return <ListGroupItem bsStyle="danger" key={index}>{err}</ListGroupItem>;
          })
        }
      </ListGroup>
    );
  }

  render(){
    return (
      <Grid>
        <Row>
          <Col xs={6} xsPush={3}>
            <h1>User Log in</h1>
            <form>
                <FormGroup
                  controlId="loginForm">
                  <FormControl
                    type="text"
                    value={this.state.email}
                    placeholder="User email"
                    onChange={this.onEmailChange}/>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    type="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.onPasswordChange}/>
                </FormGroup>
                <FormGroup>
                  <Button bsStyle="primary" onClick={this.loginUser}>Login</Button>
                </FormGroup>
                <FormGroup>
                  <div className='login-form-feedback'>
                    { this.state.errors && this.state.errors.length > 0 && this.errorList() }
                    { this.state.loading && <div className='loading-icon'><DoubleBounce size={50} /></div> }
                  </div>
                </FormGroup>
              </form>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Login