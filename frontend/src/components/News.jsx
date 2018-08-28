import React, { Component } from 'react'
import { Col, Panel } from 'react-bootstrap'
import { DoubleBounce } from 'better-react-spinkit'
import Article from 'components/Article'
import 'styles/News.css'
import 'styles/SharedStyles.css'

class News extends Component {

  constructor(props){
    super(props)
    this.state = {
      articles: [],
      loading: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true })
    fetch('/articles').then((response)=>{
      this.setState({ loading: false })
      if(response.ok){
        return response.json()
      }else{
        throw new Error(response.error)
      }
    }).then( (data) => {
      this.setState({ articles: data })
    }).catch((error) => {
      this.setState({ errors: [error.message], loading: false })
    })
  };

  articleList() {
    if (this.state.articles.length > 0){
      return (
        <div>
          {
            this.state.articles.map((article, index) => {
              return (
                <div key={index}>
                  <Article article={article} />
                  { index !== this.state.articles.length-1 && <hr /> }
                </div>
              )
            })
          }
        </div>
      )
    }else{
      return <div>Coming Soon!</div>
    }
  }

  render(){
    return(
      <Col xs={12} className="news-container">
        <Panel>
          <Panel.Heading>News</Panel.Heading>
          <Panel.Body>
            { this.state.loading && <DoubleBounce size={50} /> }
            { !this.state.loading && this.articleList() }
          </Panel.Body>
        </Panel>
      </Col>
    )
  }
}

export default News