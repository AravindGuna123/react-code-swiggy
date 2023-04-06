import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'

import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const {cartImage} = props
  const [showBurger, setBurger] = useState(false)
  const burgerClass = showBurger ? 'showBurgerClass' : 'hideBurgerClass'
  const onClickLogout = () => {
    localStorage.removeItem('cartData')
    Cookie.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }
  return (
    <div>
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/" className="nav-link">
            <img
              className="website-logo-header"
              src="https://res.cloudinary.com/dcuyzmv7s/image/upload/v1678651915/Vector_xxd4t2.png"
              alt="website logo"
            />
          </Link>
          <h1 className="logo-heading-header">Tasty Kitchens</h1>
        </div>

        <button
          type="button"
          className="burger-button"
          onClick={() => setBurger(!showBurger)}
        >
          <GiHamburgerMenu />
        </button>

        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>

          <Link to="/cart" className="nav-link">
            {cartImage ? <li className="orange-cart">Cart</li> : <li>Cart</li>}
          </Link>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
      </nav>
      <ul className={burgerClass}>
        <div className="first">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>

          <Link to="/cart" className="nav-link">
            {cartImage ? <li className="orange-cart">Cart</li> : <li>Cart</li>}
          </Link>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <button
          type="button"
          onClick={() => setBurger(!showBurger)}
          className="burger-button"
        >
          <MdClose />
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)
