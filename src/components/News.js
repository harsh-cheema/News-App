
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    category:'general',
    pageSize:8
  }
  static propTypes={
    category:propTypes.string,
    pageSize:propTypes.number
  }
  
  constructor() {
    super();
    this.state = {
      articles:[],
      loading: false,
      page:1,
      totalResults:0,
      
    };
  }
  async update(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1aca3f53992f4d3abc7854d3f506e687&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }

  async componentDidMount(){
    this.update()
  }
  fetchMore = async ()=>{
     
     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1aca3f53992f4d3abc7854d3f506e687&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
     this.setState({page:this.state.page+1})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults})
   }
  // prev= async ()=>{
  //   this.setState({page:this.state.page-1})
  //   this.update()
  // }
  // next=async ()=>{
  //   this.setState({page:this.state.page+1})
  //   this.update()}
    
   

  
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="text-center" style={{marginTop:'80px'}}>News Monkey-{this.props.category.charAt(0).toUpperCase()}{this.props.category.slice(1)} Headlines</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll 
          dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
          >
<div className="container">
          <div className="row my-3">
            { this.state.articles.map((element)=>{
              return(
            <div className="col md-4" key={element.url}>
              <Newsitem title={element.title? element.title.slice(0,45):element.title} description={element.description?element.description.slice(0,88):element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>)})
            }
           
          </div>
          </div>
          </InfiniteScroll>
          
        </div>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.prev}>&larr; Previous</button>
        <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-primary "onClick={this.next}> Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
