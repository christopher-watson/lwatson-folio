import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class Upload extends Component {
  state = {
    redirectHome: false,
    redirectEdit: false,
    isLoggedIn: false,
    loginInvalid: false,
    username: "",
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
          this.setState({ isLoggedIn: true })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoggedIn: false})
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
          this.setState({ isLoggedIn: true })
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

  logout = () => {
    API
      .logout({ username: this.state.username })
      .then(
        this.setState({ isLoggedIn: false }),
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

  renderRedirectEdit = () => {
    if (this.state.redirectEdit) {
      return <Redirect to='/edit' />
    }
  }

  addImage = (url) => {
    API
      .addImage({
        url: url
      })
      .then(res => {
        console.log(res.data)
        API
          .addImageToUser('5cc079b8e86e8d9769cfc66d', {
              _id: res.data._id,
              url: url,
          })
      })
  }

  checkUploadResult = (resultEvent) => {
    if(resultEvent.event === 'success'){
      console.log(resultEvent)
      this.addImage(resultEvent.info.url)
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
      <div className='upload-container'>
        {this.renderRedirectHome()}
        {this.renderRedirectEdit()}
      {

        this.state.isLoggedIn ?

          <div className="button-div">
            <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
            <button className='button upload-button' onClick={() => this.showWidget(widget)}><i className='fas fa-cloud-upload-alt'></i> Upload Image(s)</button>
            <button className='button edit-button' onClick={this.setRedirectEdit}><i className='fas fa-cut'></i> Edit</button>
            <button className='button logout-button' onClick={this.logout}><i className='fas fa-door-open'></i> Logout</button>
          </div>

          : 

          <div className='form-container'>
            <button className='button home-button' onClick={this.setRedirectHome}><i className='fas fa-home'></i> Home</button>
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
            <small id='login-error'>
              { this.state.loginInvalid ? 'Incorrect Username' : <br/> }
            </small>
          </div>

      }
      </div>
    );
  }
}

export default Upload;