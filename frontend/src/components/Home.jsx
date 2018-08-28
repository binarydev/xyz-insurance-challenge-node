import React from 'react'
import gulfstreamJetImg from 'images/gulfstream.jpg'
import News from 'components/News'
import 'styles/Home.css'
import 'styles/SharedStyles.css'

const Home = () => (
  <div>
    <div className='hero-image-container'>
      <div style={{backgroundImage: `url(${gulfstreamJetImg})`}} className="hero-image"/>
    </div>
    <h1 className="intro">
      We work with our insured to identify all of their aviation insurance exposures.
    </h1>
    <hr />  
    <News />
  </div>
)

export default Home
