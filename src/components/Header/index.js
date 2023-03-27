import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    localStorage.removeItem('cartData')
    Cookie.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <img
            className="website-logo-header"
            src="https://res.cloudinary.com/dcuyzmv7s/image/upload/v1678651915/Vector_xxd4t2.png"
            alt="website logo"
          />
        </Link>
        <h1 className="logo-heading">Tasty Kitchens</h1>
      </div>
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>

        <Link to="/cart" className="nav-link">
          <li>Cart</li>
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
  )
}
export default withRouter(Header)
