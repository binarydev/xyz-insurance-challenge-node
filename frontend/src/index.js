import React from 'react'
import ReactDOM from 'react-dom'
import XavierApp from 'components/XavierApp'
import { BrowserRouter } from 'react-router-dom'
import 'styles/index.css'

ReactDOM.render((
  <BrowserRouter>
    <XavierApp />
  </BrowserRouter>
), document.getElementById('root') );
