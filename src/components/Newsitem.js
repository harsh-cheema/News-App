import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props;
    return (
      
      <div>
        <div class="card" style={{width: '20rem'}}>
  <img src={imageurl? imageurl:'https://cricketaddictor.com/wp-content/uploads/2022/04/2-1-10.png'} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class='card-text'><small className='text-muted'>By {author? 'Unknown':author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} target="_blank " className="btn btn-dark btn-sm">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
