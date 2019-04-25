import React from "react";
import "../Gallery/Gallery.css";
const gallery = document.querySelector('.gallery-inner-div');
    
function generateHTML([h, v]){
  return `
    <div className="item h${h} v${v}">
      <img src="https://res.cloudinary.com/yowats0n/image/upload/v1554843194/rw-music/wutang.jpg">
    </div>
  `
}

function randomNumber(limit){
  return Math.floor(Math.random() * limit) + 1;
}

const digits = Array.from({ length: 50 }, () => 
[randomNumber(4), randomNumber(4)]);
// console.log(digits)

const html = digits.map(generateHTML).join('')
// console.log(html)

// gallery.innerHTML = html;


const Gallery = props => (
  <div className="gallery-inner-div">
    {/* {props.eventUsers.map(user => (
      <div key={user._id}>

      </div>
    ))} */}
  </div>
);
  
export default Gallery;