/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    activeCount: 1,
  }

  componentDidMount() {
    this.updateQuantity()
  }

  updateQuantity = () => {
    const {details} = this.props
    const {id} = details
    const cartListCounter = JSON.parse(localStorage.getItem('cartData'))
    const resultItem = cartListCounter.filter(each => each.id === id)
    console.log(resultItem)
    if (resultItem.length !== 0) {
      this.setState({
        activeCount: resultItem[0].quantity,
      })
    }
  }

  onDecrement = () => {
    const {activeCount} = this.state
    const {details, zeroQuantity} = this.props
    const {id} = details
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    if (activeCount > 1) {
      const updatedList = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return {...each}
      })
      localStorage.setItem('cartData', JSON.stringify(updatedList))
      this.setState(prevState => ({
        activeCount: prevState.activeCount - 1,
      }))
    } else {
      const updatedList = cartList.filter(each => each.id !== id)

      localStorage.setItem('cartData', JSON.stringify(updatedList))
      zeroQuantity()
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
      activeCount: prevState.activeCount + 1,
    }))
  }

  render() {
    const {activeCount} = this.state
    return (
      <div className="button-container-counter">
        <button
          type="button"
          onClick={this.onDecrement}
          testid="decrement-count"
        >
          -
        </button>
        <div testid="active-count">{activeCount}</div>
        <button
          type="button"
          onClick={this.onIncrement}
          testid="increment-count"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
