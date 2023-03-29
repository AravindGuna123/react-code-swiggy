/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

class CartDataRender extends Component {
  state = {
    x: 0,
  }

  componentDidMount() {
    this.updateQuantity()
  }

  updateQuantity = () => {
    const {details} = this.props
    const {quantity} = details
    this.setState({
      x: quantity,
    })
  }

  onDecrement = () => {
    const {x} = this.state
    const {details, zeroItem} = this.props
    const {id} = details
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    if (x > 1) {
      const updatedList = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return {...each}
      })
      localStorage.setItem('cartData', JSON.stringify(updatedList))
      this.setState(
        prevState => ({
          x: prevState.x - 1,
        }),
        zeroItem(),
      )
    } else {
      const updatedList = cartList.filter(each => each.id !== id)

      localStorage.setItem('cartData', JSON.stringify(updatedList))
      zeroItem()
      this.setState(prevState => ({
        x: prevState.x - 1,
      }))
    }
  }

  onIncrement = () => {
    const {details, zeroItem} = this.props
    const {id} = details
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return {...each}
    })
    localStorage.setItem('cartData', JSON.stringify(updatedList))

    this.setState(
      prevState => ({
        x: prevState.x + 1,
      }),
      zeroItem(),
    )
  }

  render() {
    const {details} = this.props
    const {id, cost, imageUrl, name} = details
    const {x} = this.state
    return (
      <div>
        {x > 0 ? (
          <li testid="cartItem" className="each-item-props">
            <div className="name-image-container">
              <img src={imageUrl} alt="foodItem" className="cart-image" />
              <h1
                style={{
                  fontSize: '20px',
                  marginLeft: '10px',
                  fontFamily: 'DM Sans',
                  fontWeight: 'normal',
                }}
              >
                {name}
              </h1>
            </div>
            <div className="button-container">
              <button
                type="button"
                onClick={this.onDecrement}
                className="button-props-decrement"
                testid="decrement-quantity"
              >
                -
              </button>
              <p testid="item-quantity">{x}</p>
              <button
                type="button"
                onClick={this.onIncrement}
                testid="increment-quantity"
                className="button-props-increment"
              >
                +
              </button>
            </div>
            <p
              style={{marginLeft: '290px', color: '#FFA412', fontWeight: '700'}}
            >
              <BiRupee /> {cost * x}.00
            </p>
          </li>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default CartDataRender
