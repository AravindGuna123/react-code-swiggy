/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartDataRender from '../CartDataRender'
import './index.css'

const cartItemsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  noItems: 'NOITEMS',
  inProgress: 'IN_PROGRESS',
  placeOrder: 'PLACEORDER',
}

class Cart extends Component {
  state = {
    cartStatus: cartItemsStatus.initial,
    cartDataList: [],
  }

  componentDidMount() {
    this.getCart()
  }

  getCart = async () => {
    this.setState({
      cartStatus: cartItemsStatus.inProgress,
    })
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList.length > 0) {
      this.setState({
        cartStatus: cartItemsStatus.success,
        cartDataList: cartList,
      })
    } else {
      this.setState({
        cartStatus: cartItemsStatus.noItems,
      })
    }
  }

  renderLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  clickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderNoitems = () => (
    <div className="no-container">
      <img
        src="https://res.cloudinary.com/dcuyzmv7s/image/upload/v1679939088/OBJECTS_ez8ndv.png"
        alt="empty cart"
        className="empty-image"
      />
      <h1>No Order Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Link to="/">
        <button type="button" className="order-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPlaceOrder = () => (
    <div className="no-container">
      <img
        src="https://res.cloudinary.com/dcuyzmv7s/image/upload/v1679939237/Vector_4_qll6mm.png"
        alt="orderPlaced"
        className="order-placed-image"
      />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Link to="/">
        <button type="button" className="order-button">
          Go to Home Page
        </button>
      </Link>
    </div>
  )

  zeroItem = () => {
    this.getCart()
  }

  clickOrder = () => {
    this.setState({
      cartStatus: cartItemsStatus.placeOrder,
    })
  }

  renderCart = () => {
    const {cartDataList} = this.state
    const total = cartDataList.map(each => each.quantity * each.cost)
    const totalValue = total.reduce(
      (accumulator, value) => accumulator + value,
      0,
    )

    return (
      <div>
        {cartDataList.length > 0 ? (
          <div className="cart-inner-container">
            <div className="heading">
              <p>Item</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>
            <ul className="order-list-props">
              {cartDataList.map(each => (
                <CartDataRender
                  details={each}
                  key={each.id}
                  zeroItem={this.zeroItem}
                />
              ))}
            </ul>
            <hr className="line-props" />
            <div className="total-container">
              <h1 style={{fontSize: '24px'}}>Order Total:</h1>
              <div className="total-container-inner">
                <p testid="total-price" style={{fontSize: '24px'}}>
                  <BiRupee /> {totalValue}
                </p>
                <button
                  type="button"
                  onClick={this.clickOrder}
                  className="order-button"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          this.renderNoitems()
        )}
      </div>
    )
  }

  getCartStatus = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartItemsStatus.inProgress:
        return this.renderLoading()
      case cartItemsStatus.success:
        return this.renderCart()
      case cartItemsStatus.noItems:
        return this.renderNoitems()
      case cartItemsStatus.placeOrder:
        return this.renderPlaceOrder()
      default:
        return null
    }
  }

  render() {
    const {cartStatus} = this.state
    let val
    if (cartStatus === 'SUCCESS') {
      val = true
    } else {
      val = false
    }

    return (
      <div className="cart-container">
        <Header cartImage="true" />
        {this.getCartStatus()}
        {val ? <Footer className="footer-align" /> : ''}
      </div>
    )
  }
}

export default Cart
