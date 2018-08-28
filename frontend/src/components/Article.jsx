import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import autoBind from 'react-autobind'
import TextUtils from '../isomorphicUtilities/TextUtils'
import 'styles/Article.css'

class Article extends Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
    autoBind(this)
  }

  truncationLength(){
    return 200
  }

  truncateAndSanitize(text){
    return TextUtils.replace( TextUtils.truncate(text, this.truncationLength()), /<[^>]*>/, ' ')
  }

  onExpandToggle(){
    this.setState({ expanded: !this.state.expanded })
  }

  generateToggleText(){
    return this.state.expanded ? "Collapse" : "Read Full Article"
  }

  htmlContent(){
    return (!this.shouldShowToggle() || this.state.expanded) ? this.props.article.body : this.truncateAndSanitize(this.props.article.body)
  }

  shouldShowToggle(){
    return (this.state.expanded) || (!this.state.expanded && this.props.article.body.length > this.truncationLength())
  }

  render(){
    return(
      <div>
        <h2>{this.props.article.title}</h2>
        <h5>written on {(new Date(this.props.article.created_at)).toDateString()}</h5>
        <div>
          <div dangerouslySetInnerHTML={{__html: this.htmlContent()}} />
          <div className='text-right'>
            { this.shouldShowToggle() && <Button bsStyle='link' onClick={this.onExpandToggle}>{this.generateToggleText()}</Button> }
          </div>
        </div>
      </div>
    )
  }
}

export default Article