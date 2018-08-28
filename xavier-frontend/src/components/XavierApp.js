import React, { Component } from 'react';
import logo from 'images/logo.svg';
import gulfstreamJetImg from 'images/gulfstream.jpg'
import 'styles/XavierApp.css';
import News from 'components/News'

class XavierApp extends Component {
  render() {
    return (
      <div className="app-root">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Trust the world-leaders in private jet liability insurance.</h1>
        </header>
        <div className='hero-image-container'>
          <div style={{backgroundImage: `url(${gulfstreamJetImg})`}} className="hero-image"/>
        </div>
        <h1 className="intro">
          We work with our insured to identify all of their aviation insurance exposures.
        </h1>
        <hr />  
        <div className="page-container">
          <News />
        </div>
      </div>
    );
  }
}

export default XavierApp;
