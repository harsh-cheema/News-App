import React, { Component } from 'react'
import loading from '../loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading.." style={{height:'35px', width:'35px'}}/>
      </div>
    )
  }
}
