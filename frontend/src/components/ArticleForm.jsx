import React, { Component } from 'react'
import { FormGroup, FormControl, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import autoBind from 'react-autobind'
import { DoubleBounce } from 'better-react-spinkit'
import 'styles/ArticleForm.css'
import 'styles/SharedStyles.css'

class ArticleForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      errors: []
    }
    autoBind(this)
  }

  onBodyChange(evt){
    this.props.onArticleInput({ ...this.props.article, body: evt.target.value })
  }

  onTitleChange(evt){
    this.props.onArticleInput({ ...this.props.article, title: evt.target.value })
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

  onSaveArticle(){
    this.props.onSaveArticle(()=> this.props.onCloseArticle)
  }

  render(){
    return(

      <form>
          <FormGroup
            controlId="articleForm">
            <FormControl
              type="text"
              value={this.props.article.title}
              placeholder="Article Title"
              onChange={this.onTitleChange}/>
          </FormGroup>
          <FormGroup>
            <FormControl
              componentClass="textarea"
              value={this.props.article.body}
              placeholder="Article Body"
              onChange={this.onBodyChange}/>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" onClick={this.props.onSaveArticle}>Save</Button> &nbsp;
            <Button bsStyle="default" onClick={this.props.onCloseArticle}>Close</Button>
          </FormGroup>
          <FormGroup>
            <div className='article-form-feedback'>
              { this.state.errors && this.state.errors.length > 0 && this.errorList() }
              <div className='text-center'>
                { this.state.loading && <DoubleBounce size={50} /> }
              </div>
            </div>
          </FormGroup>
        </form>
    
    )
  }
}

export default ArticleForm