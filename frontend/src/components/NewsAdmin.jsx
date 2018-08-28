// NOTE: This component can really be broken down further into smaller components,
// it's fairly large for such a simple interface
import React, {Component} from 'react'
import { DoubleBounce } from 'better-react-spinkit'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import CustomModal from 'components/CustomModal'
import ArticleForm from 'components/ArticleForm'
import autoBind from 'react-autobind'
import Article from 'components/Article'
import _ from 'underscore'
import 'styles/NewsAdmin.css'
import 'styles/SharedStyles.css'

class NewsAdmin extends Component{
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: true,
      user: props.currentUser,
      errors: [],
      currentArticle: null,
      showModal: false
    }
    autoBind(this)
  }

  componentWillMount() {
    this.fetchArticles()
  };

  fetchArticles(){
    if(this.state.user){
      this.setState({ loading: true })
      fetch('/articles').then((response)=>{
        this.setState({ loading: false })
        if(response.ok){
          return response.json()
        }else{
          throw new Error(response.error)
        }
      }).then((data)=>{
        this.setState({ articles: data, errors: [] })
      }).catch((error) => {
        this.setState({ errors: [error.message], loading: false })
      })
    }
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

  onAddArticle(){
    let newArticle = { 
      body: '', 
      title: '', 
      created_at: Date.now(),
      _id: Date.now(),
      unsaved: true
    }

    this.setState({
      articles: 
      [ 
        newArticle,
        ...this.state.articles
      ],
      currentArticle: newArticle,
      errors: []
    })
  }

  saveArticle(evt){
    if(!this.validateForm()){
      this.setState({ errors: ["Either the title or body of the article is empty. Please enter values for both prior to saving"] })
      return false
    }
    this.setState({ loading: true })
    let params = {
      method: 'POST',
      body: JSON.stringify({
        token: this.state.user.api_token,
        article: {
          body: this.state.currentArticle.body,
          title: this.state.currentArticle.title,
          created_at: Date.now()
        }
      }),
      headers: new Headers({'Content-Type': 'application/json'})
    }

    fetch('/articles', params).then((response)=>{
      this.setState({ loading: false })
      if(response.ok){
        return response.json()
      }else{
        throw new Error(response.statusText)
      }
    }).then(((data) => {
      if(data){
        this.setState({
          articles: 
          [ 
            data,
            ..._.reject(this.state.articles, (article)=>{ return article._id === this.state.currentArticle._id})
          ], 
          currentArticle: null,
          errors: []
        })
      }
    })).catch((error) => {
      this.setState({ errors: [error.message], loading: false })
    })
  }

  updateArticle(evt){
    if(!this.validateForm()){
      this.setState({ errors: ["Either the title or body of the article is empty. Please enter values for both prior to saving"] })
      return false
    }
    this.setState({ loading: true })
    let params = {
      method: 'PUT',
      body: JSON.stringify({
        token: this.state.user.api_token,
        article: {
          _id: this.state.currentArticle._id,
          body: this.state.currentArticle.body,
          title: this.state.currentArticle.title,
          created_at: this.state.currentArticle.created_at
        }
      }),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    fetch(`/articles/${this.state.currentArticle._id}`, params).then((response)=>{
      this.setState({ loading: false })
      if(response.ok){
        return response.json()
      }else{
        throw new Error(response.statusText)
      }
    }).then(((data) => {
      if(data){
        let updatedArticles = _.map(this.state.articles, (article)=>{ 
          return article._id === this.state.currentArticle._id ? data : article 
        })
        this.setState({
          articles: updatedArticles,
          currentArticle: null,
          errors: [] 
        })
      }
    })).catch((error) => {
      this.setState({ errors: [error.message], loading: false })
    })
  }

  validateForm(){
    return this.state.currentArticle.title.length > 0 && this.state.currentArticle.body.length > 0
  }

  onArticleInput(updatedAttrs){
    this.setState({currentArticle: updatedAttrs})
  }

  onDeleteArticle(article){
    let params = {
      method: 'DELETE',
      body: JSON.stringify({
        token: this.state.user.api_token,
        article: {
          _id: article._id
        }
      }),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    fetch(`/articles/${article._id}`, params).then((response)=>{
      this.setState({ loading: false })
      if(response.ok){
        this.setState({articles: _.reject(this.state.articles, (art) => { return art._id === article._id }), errors: []})
      }else{
        this.setState({errors: [response.error.message]})
      }
    })
  }

  onSelectArticle(article){
    this.setState({currentArticle: article, errors: []})
  }

  onCancelDeletion() {
    this.setState({ showModal: false });
  }

  onDeleteConfirmation(article) {
    this.setState({ showModal: true, articleForDeletion: article });
  }

  onConfirmDeletion(article){
    this.setState({ showModal: false });
    this.onDeleteArticle(this.state.articleForDeletion)
    this.setState({ articleForDeletion: null })
  }

  isCurrentArticle(article){
    return (this.state.currentArticle && article._id === this.state.currentArticle._id)
  }

  articleList() {
    if (this.state.articles.length > 0){
      return (
        <div className='article-list-container'>
          {
            this.state.articles.map((article, index) => {
              return (
                <div key={index}>
                  { !this.isCurrentArticle(article) && <Article  article={article} /> }
                  { !this.isCurrentArticle(article) && <Button bsStyle="primary" bsSize='xsmall' onClick={() => this.onSelectArticle(article)}>Edit</Button> }&nbsp;
                  { !this.isCurrentArticle(article) && <Button bsStyle="danger" bsSize='xsmall' onClick={() => this.onDeleteConfirmation(article)}>Delete</Button> }
                  { this.isCurrentArticle(article) && 
                    <ArticleForm  article={this.state.currentArticle} 
                                  onSaveArticle={!this.state.currentArticle.unsaved ? this.updateArticle : this.saveArticle} 
                                  onCloseArticle={()=>this.onSelectArticle(null)}
                                  onArticleInput={this.onArticleInput}
                    /> 
                  }
                  { this.modalHtml(article) }
                  { index !== this.state.articles.length-1 && <hr /> }
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  modalHtml(article){
    let buttons = <div>
      <Button bsStyle='danger' onClick={()=>this.onConfirmDeletion(article)}>Confirm</Button>
      <Button onClick={this.onCancelDeletion}>Cancel</Button>
    </div>
    return(
      <CustomModal show={this.state.showModal} onHide={this.onCancelDeletion} headerText="Confirm Deletion" buttons={buttons}>
          <p>This delete action cannot be undone! Are you sure?</p>
    
      </CustomModal>
    )
  }

  render(){
    return (
      <div>
        <h1>Articles</h1>
        <div className='text-right'><Button bsStyle="primary" onClick={this.onAddArticle}>Add New Article</Button></div>
        <div className='feedback'>
          { this.state.errors && this.state.errors.length > 0 && this.errorList() }
          { this.state.loading && <div className='loading-icon'><DoubleBounce size={50} /></div> }
          { this.state.articles.length === 0 && !this.state.loading && <p>No articles currently present.</p> }
        </div>
        { this.articleList() }
      </div>
    )
  }
}

export default NewsAdmin
