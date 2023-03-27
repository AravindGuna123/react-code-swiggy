import {Component} from 'react'
import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaInstagramSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="icon-container-footer">
        <img
          src="https://res.cloudinary.com/dcuyzmv7s/image/upload/v1679746096/Group_7420_m2inwk.png"
          alt="website-footer-logo"
          className="footer-image"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p style={{fontSize: '22px'}}>
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icons-container">
        <FaPinterestSquare
          className="social-icons"
          data-tesid="pintrest-social-icon"
        />
        <FaInstagramSquare
          className="social-icons"
          data-tesid="instagram-social-icon"
        />
        <FaTwitter className="social-icons" data-tesid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icons"
          data-tesid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
