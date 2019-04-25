import axios from 'axios';

export default {

  addImage: function(url) {
    return axios.post('/api/images/new', url)
  },

  addImageToUser: function(userID, imageID) {
    return axios.post(`/api/users/add/${userID}`, imageID)
  },

  removeImage: function(userID, imageID) {
    return axios.put(`/api/users/remove/${userID}`, {
      _id: imageID
    })
  },

  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds)
  },

  loginCheck: function() {
    return axios.get('/api/users/login')
  },

  logout: function() {
    return axios.get('/api/users/logout')
  },
  
  findUser: function(username) {
    return axios.get(`/api/users/find/${username}`)
  },

}

// grabAllImages: async function() {
//   const res = await axios.get('https://api.cloudinary.com/v1_1/yowats0n/resources/image')
//   return await res;
// },