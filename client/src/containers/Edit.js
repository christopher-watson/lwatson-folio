import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class Edit extends Component {
  state = {
    redirectHome: false,
    loginInvalid: false,
    loggedInUser: '',
    username: "",
    images: [],
  }
  
  componentDidMount() {
    this.loginCheck();
  }

  loginCheck = () => {
    API
      .loginCheck()
      .then(res => {
        if (res.data.username === 'lwatson14'){
          console.log('👍🏽')
          this.setState({ isLoggedIn: true, loggedInUser: 'lwatson14' })
          this.getImages()
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  login = (e) => {
    e.preventDefault();
    API
      .login({ username: this.state.username, password: 'password' })
      .then(res => {
        if (res.data.username === 'lwatson14'){
          console.log('👍🏽')
          this.setState({ isLoggedIn: true, loggedInUser: 'lwatson14' })
          this.getImages()
        }
      })
      .catch(err => {
        console.log(err.response);
        if(err.response.data === 'Unauthorized' || err.response.data === 'Bad Request'){
          console.log('🧐');
          this.setState({ loginInvalid: true })
          setTimeout(() => { this.setState({ loginInvalid: false }) }, 3000)
        }
      })
  }

  getImages = () => {
    API
      .findUser(this.state.loggedInUser)
      .then(res => {
        console.log('📷')
        this.setState({
          images: [...res.data._images]
        })
      })
      .catch(err => console.log(err))
  }

  logout = () => {
    API
      .logout({username: 'lwatson14'})
      .then(
        this.setRedirectHome,
      )
      .catch(err => console.log(err.response));
  }

  setRedirectHome = () => {
    this.setState({
      redirectHome: true
    })
  }

  setRedirectEdit = () => {
    this.setState({
      redirectEdit: true
    })
  }

  renderRedirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to='/' />
    }
  }

  addImage = (url) => {
    API
      .addImage({
        url: url
      })
      .then(res => {
        // console.log(res.data)
        API
          .addImageToUser('5cc079b8e86e8d9769cfc66d', {
              _id: res.data._id,
              url: url,
          })
        })
        .then(
          setTimeout(() => { this.getImages() }, 500)
        )
      }

  removeImageFromState = (imageIndex) => {
    let images = [...this.state.images]
    images.splice(imageIndex, 1)
    this.setState({
      images: images
    })
  }

  removeImage = (imageID, index) => {
    API
      .removeImage('5cc079b8e86e8d9769cfc66d', imageID)
      .then(
        console.log('done'),
        this.removeImageFromState(index)
      )
  }

  checkUploadResult = (resultEvent) => {
    if(resultEvent.event === 'success'){
      // console.log(resultEvent)
      this.addImage(resultEvent.info.secure_url)
    }
  }

  showWidget = (widget) => {
    widget.open()
  }

  render() {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: 'yowats0n',
      uploadPreset: 'fkddaw6o'
    },
    (error, result) => {
      this.checkUploadResult(result)
    })
    return (
      <div className='edit-container'>
        {this.renderRedirectHome()}
      {

        this.state.isLoggedIn ?
          <div className="edit-inner-container">
            <div className="edit-button-div">
              <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
              <button className='button upload-button' onClick={() => this.showWidget(widget)}><i className='fas fa-cloud-upload-alt'></i> Upload Image(s)</button>
              <button className='button logout-button' onClick={this.logout}><i className='fas fa-door-open'></i> Logout</button>
            </div>
            <div className='image-container'>
            {
              this.state.images.length > 0 ?

              <div className="inner-image-div">
                {this.state.images.map((image, index) => (
                  <div key={Math.random() * 1000 +1} className='map-div'>
                    <div className="image-div">
                      <img className='edit-page-image' src={image.url} alt={image.url}/>
                    </div>
                    <div className="remove-div">
                      <button className='remove-button' onClick={() => this.removeImage(image._id, index)}><i className='fas fa-times-circle'></i> Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              :

              <div className="no-images">
                No Images! <i className="fas fa-images"></i>
              </div>

            }
            </div>
          </div>

          : 

          <div className='edit-form-container'>
            <div className="inner-edit-button-div">
              <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
            </div>
            <div className="inner-edit-form-div">
              <form>
                <label htmlFor='username' className='username-label'>Login</label>
                <input
                  type='text'
                  name='username'
                  className='username-input'
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <button type='submit' className='login-button' onClick={this.login}><i className='fas fa-check-circle'></i></button>
              </form>
            </div>
            <small id='login-error'>
              { this.state.loginInvalid ? 'Incorrect Username' : <br/> }
            </small>
          </div>

      }
      </div>
    );
  }
}

export default Edit;