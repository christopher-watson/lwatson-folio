import React, { Component } from "react";
import API from "../utils/API";


// Context API
export const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {
    galleryView: true,
    images: [],
    displayImageIndex: 0,
  }

  componentWillMount() {
    this.getImages()
  }
  
  getImages = () => {
    API
      .findUser('lwatson14')
      .then(res => {
        this.setState({
          images: [...res.data._images]
        })
      })
      .catch(err => console.log(err))
  }

  getIndex = () => {
    console.log(this.state.images[0].url)
  }

  showDisplayImage = (index) => {
    this.setState({ galleryView: false, displayImageIndex: index })
  }

  showGalleryView = () => {
    if(!this.state.galleryView){
      this.setState({ galleryView: true })
    }
  }

  leftArrowClick = () => {
    console.log(this.state.displayImageIndex)
    if(!this.state.galleryView){
      if (this.state.displayImageIndex-1 === -1){
        this.setState({ displayImageIndex: this.state.images.length })
      }
      else {
        this.setState({ displayImageIndex: this.state.displayImageIndex-1 })
      }
    }
  }

  rightArrowClick = () => {
    console.log(this.state.displayImageIndex)
    if(!this.state.galleryView){
      if (this.state.displayImageIndex+1 === this.state.images.length){
        this.setState({ displayImageIndex: 0 })
      }
      else {
        this.setState({ displayImageIndex: this.state.displayImageIndex+1 })
      }
    }
  }

  render() {
    return (
      <MyContext.Provider value={{
        // state
        state: this.state,
        galleryView: this.state.galleryView,
        images: this.state.images,
        displayImageIndex: this.state.displayImageIndex,
        
        // functions
        getIndex: this.getIndex,
        showDisplayImage: this.showDisplayImage,
        showGalleryView: this.showGalleryView,
        displayImage: this.displayImage,
        leftArrowClick: this.leftArrowClick,
        rightArrowClick: this.rightArrowClick,
        
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

// Navbar
const Navbar = () => {
  return (
    <MyContext.Consumer>
      {({ showGalleryView, leftArrowClick, rightArrowClick }) => (
        <div className='nav-div'>
          <div className="logo">Lindsay<br/>Watson</div>
          <div className="info-text">
            <ul className='info-ul'>
              <li className='info-li'>Modeling</li>
              <li className='info-li'>Acting</li>
              <li className='info-li'>Writing</li>
              <li className='info-li'>Fitness</li>
            </ul>
          </div>
          <div className="cta">Contact</div>
          <div className="social">
            <ul className='social-ul'>
              <li className='social-li hover'><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i></a>
              </li>
              <li className='social-li hover'><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i></a>
              </li>
              <li className='social-li hover'><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i></a>
              </li>
            </ul>
          </div>
          <div className="pagination">
            <div className='left-arrow hover' onClick={() => leftArrowClick()}><i className="fas fa-angle-double-left"></i></div>
            <div className='right-arrow hover' onClick={() => rightArrowClick()}><i className="fas fa-angle-double-right"></i></div>
            <div className="show-all hover" onClick={() => showGalleryView()}><i className="fas fa-th"></i></div>
          </div>
        </div>
      )}
    </MyContext.Consumer>
  );
};

// Image Gallery
class Gallery extends Component {

  render() {
    function randomNumber(limit){
      return Math.floor(Math.random() * limit) + 1;
    }
    return (
      <MyContext.Consumer>
        {({ galleryView, images, showDisplayImage, displayImageIndex, showGalleryView }) => (
          <div className="gallery-div">
          {

            galleryView ?

            <div className="inner-gallery-div">
              {images.map((image, index) => (
                <div key={index} className='gallery-map-div hover' grid-w={randomNumber(2)} grid-h={randomNumber(2)}>
                  <img className='gallery-page-image' src={image.url} alt={`Lindsay: ${index+1}`} onClick={() => showDisplayImage(index)}/>
                </div>
              ))}
            </div>

            :

            <div className="inner-display-div">
              <img className='display-image' src={images[displayImageIndex].url} alt={`Lindsay: ${displayImageIndex}`} onClick={() => showGalleryView()}/>
            </div>

          }
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}


// Home Page
class Home extends Component {  
  componentDidMount() {
    console.log('Welcome to Lindsay Watson\'s Portfolio')
    console.log('All Rights Reserved | www.christopherwatson.co')
  }

  render () {
    return (
      <MyProvider>
        <div className="home-container">
          <div className="nav-container"><Navbar/></div>
          <div className="gallery-container"><Gallery/></div>
        </div>
      </MyProvider>
    )
  }
}

export default Home;