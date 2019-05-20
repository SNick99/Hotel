import React, { Component } from 'react';
import picture from '../../images/pets.jpg';
import './Landing.css';
class Landing extends Component {
  render() {
    return (
      <div>
        <img alt="картинка панды в теории" src={picture} />
      </div>
    );
  }
}

export default Landing;
