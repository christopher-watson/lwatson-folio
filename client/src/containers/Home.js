import React, { Component, Fragment } from "react";
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
  
  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeyPress)
  }
  
  handleResize = () => {
    // console.log(window.innerWidth)
    if(window.innerWidth < 901) {
      this.setState({ mobile: true })
    }
    else {
      this.setState ({ mobile: false })
    }
  }

  handleKeyPress = (e) => {
    // console.log(e.key)
    if(e.key === 'ArrowRight'){
      this.rightArrowClick()
    }
    if(e.key === 'ArrowLeft'){
      this.leftArrowClick()
    }
  }

  getImages = () => {
    API
    .findUser('lwatson14')
    .then(res => {
        let randomNums = []
        for (var i=0; i < res.data._images.length; i++) {
          randomNums[i] = Math.floor(Math.random() * 3);
        }
        this.setState({
          images: [...res.data._images],
          randomNums: [...randomNums],
          picSize: [[1, 1],[1, 2],[2, 2]],
        })
        // console.log(this.state.picSize[randomNums[0]][0])
      })
      .catch(err => console.log(err))
  }

  
  // // PREVIOUS FUNCTION
  // getImages = () => {
  //   API
  //     .findUser('lwatson14')
  //     .then(res => {
  //       let hArray = [];
  //       let wArray = [];
  //       for (var i=0; i < res.data._images.length; i++) {
  //         hArray[i] = Math.floor(Math.random() * 2) + 1;
  //         wArray[i] = Math.floor(Math.random() * 2) + 1;
  //       }
  //       this.setState({
  //         images: [...res.data._images],
  //         hArray: [...hArray],
  //         wArray: [...wArray]
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }

  showDisplayImage = (index) => {
    this.setState({ galleryView: false, displayImageIndex: index })
  }

  showGalleryView = () => {
    if(!this.state.galleryView){
      this.setState({ galleryView: true })
    }
  }

  leftArrowClick = () => {
    const lastIndex = this.state.images.length - 1;
    const currentImageIndex  = this.state.displayImageIndex;
    const shouldResetIndex = currentImageIndex === 0;
    const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      displayImageIndex: index
    });
  }

  rightArrowClick = () => {
    const lastIndex = this.state.images.length - 1;
    const currentImageIndex  = this.state.displayImageIndex;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      displayImageIndex: index
    });
  }

  render() {
    return (
      <MyContext.Provider value={{
        // state
        state: this.state,
        galleryView: this.state.galleryView,
        images: this.state.images,
        displayImageIndex: this.state.displayImageIndex,
        mobile: this.state.mobile,
        hArray: this.state.hArray,
        wArray: this.state.wArray,
        picSize: this.state.picSize,
        randomNums: this.state.randomNums,
        
          
        // functions
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
      {({ showGalleryView, leftArrowClick, rightArrowClick, mobile, galleryView }) => (
        <div className='nav-div'>
        {
          mobile ?
          <div className="logo">LW</div>
          :
          <div className="logo">Lindsay<br/>Watson</div>
        }
          <div className="info-text">
            <ul className='info-ul'>
              <li className='info-li'>Modeling</li>
              <li className='info-li'>Acting</li>
              <li className='info-li'>Writing</li>
              <li className='info-li'>Fitness</li>
            </ul>
          </div>
          <div className="cta">
            {
              mobile ?
              <a className='cta-link' href="mailto:malerming@saltmat.com"><i className="far fa-envelope"></i></a>
              :
              <a className='cta-link' href="mailto:malerming@saltmat.com">Contact</a>
            }
          </div>
          <div className="social">
            <a className='social-item hover' href="https://www.instagram.com/lindsayawatson" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="slideshow">
            {
              galleryView ?

                <div className="noSlideshow"></div>

                :

                <Fragment>
                  <div className='left-arrow hover' onClick={() => leftArrowClick()}><i className="fas fa-angle-double-left"></i></div>
                  <div className='right-arrow hover' onClick={() => rightArrowClick()}><i className="fas fa-angle-double-right"></i></div>
                  <div className="show-all hover" onClick={() => showGalleryView()}><i className="fas fa-th"></i></div>
                </Fragment>
            }
          </div>
        </div>
      )}
    </MyContext.Consumer>
  );
};

// Image Gallery
class Gallery extends Component {

  render() {
    return (
      <MyContext.Consumer>
        {({ galleryView, images, showDisplayImage, displayImageIndex, showGalleryView, hArray, wArray, picSize, randomNums }) => (
          <div className="gallery-div">
          {

            galleryView ?

            <div className="inner-gallery-div">
              {images.map((image, index) => (
                <div key={index} className='gallery-map-div hover' grid-w={picSize[randomNums[index]][0]} grid-h={picSize[randomNums[index]][1]}>
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