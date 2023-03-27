/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Counter from '../Counter'
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
      this.setState(prevState => ({
        x: prevState.x - 1,
      }))
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
    const {details} = this.props
    const {id} = details
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return {...each}
    })
    localStorage.setItem('cartData', JSON.stringify(updatedList))

    this.setState(prevState => ({
      x: prevState.x + 1,
    }))
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
              <h1>{name}</h1>
            </div>
            <div className="button-container" testid="decrement-quantity">
              <button type="button" onClick={this.onDecrement}>
                -
              </button>
              <p>{x}</p>
              <button
                type="button"
                onClick={this.onIncrement}
                testid="increment-quantity"
              >
                +
              </button>
            </div>
            <p>{cost * x}</p>
          </li>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default CartDataRender
