// import React, { Component } from 'react';
// import API from '../utils/API';

// class Gallery extends Component {
//   state = {
//     images: [],
//   }

//   componentDidMount() {
//     this.getImages()
//     console.log('Welcome to Lindsay Watson\'s Portfolio')
//     console.log('All Rights Reserved | www.christopherwatson.co')
//   }
  
//   getImages = () => {
//     API
//       .findUser('lwatson14')
//       .then(res => {
//         this.setState({
//           images: [...res.data._images]
//         })
//       })
//       .catch(err => console.log(err))
//   }
  
//   render() {
//     function randomNumber(limit){
//       return Math.floor(Math.random() * limit) + 1;
//     }
//     return (
//       <div className="gallery-div">
//       <div className="navbar-div">
//       </div>
//         <div className="inner-gallery-div">
//           {this.state.images.map((image, index) => (
//             <div key={index} className='gallery-map-div' grid-w={randomNumber(2)} grid-h={randomNumber(2)}>
//               <img className='gallery-page-image' src={image.url} alt={`Lindsay: ${index+1}`}/>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Gallery;