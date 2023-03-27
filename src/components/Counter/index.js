/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    activeCount: 1,
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
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div testid="active-count">{activeCount}</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
