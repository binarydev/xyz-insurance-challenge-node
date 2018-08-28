import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from 'components/Home'
import Login from 'components/Login'
import NewsAdmin from 'components/NewsAdmin'
import logo from 'images/logo.svg'
import MainNav from 'components/MainNav'
import 'styles/XavierApp.css'

class XavierApp extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  setUser(user){
    this.setState({ user: user })
  }

  wrapRootComponentWithProps(component){
    if (component === Login && this.state.user){
      component = NewsAdmin
      console.log("User already logged in, redirecting")
    }
    if (component === NewsAdmin && !this.state.user){
      component = Login
      console.log("User not logged in, redirecting")
    }    
    let ComponentName = component; // component var needs to be uppercase to qualify for JSX usage
    return () => {
      return (
        <div className='page-container'>
          <ComponentName currentUser={this.state.user} setUser={this.setUser.bind(this)} />
        </div>
      )
    }
  }

  render(){
    return (
      <div className="app-root">
        <header className="header">
          <MainNav />
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Trust the world-leaders in private jet liability insurance.</h1>
        </header>
        <Route path="/users/login" component={this.wrapRootComponentWithProps(Login)}/>
        <Route path="/admin" component={this.wrapRootComponentWithProps(NewsAdmin)}/>
        <Route exact path="/" component={this.wrapRootComponentWithProps(Home)}/>
      </div>
    )
  }
}

export default XavierApp
