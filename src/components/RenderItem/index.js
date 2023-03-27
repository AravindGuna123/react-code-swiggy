/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'
import './index.css'

class RenderItem extends Component {
  state = {
    buttonVisible: true,
  }

  zeroQuantity = () => {
    this.setState({
      buttonVisible: true,
    })
  }

  render() {
    const {details} = this.props
    const {id, name, cost, imageUrl, foodType} = details
    const {buttonVisible} = this.state

    const clickAddButton = () => {
      const data = JSON.parse(localStorage.getItem('cartData'))

      const newItem = {
        id,
        name,
        imageUrl,
        cost,
        quantity: 1,
      }

      data.push(newItem)
      console.log(data)

      localStorage.setItem('cartData', JSON.stringify(data))
      this.setState(prevState => ({
        buttonVisible: !prevState.buttonVisible,
      }))
    }

    return (
      <li testid="foodItem" className="food-item">
        <img src={imageUrl} alt="food" className="food-item-image" />
        <div className="foodItem-inner-container">
          <p>{name}</p>
          <p>
            <BiRupee /> {cost}
          </p>
          {buttonVisible ? (
            <button
              type="button"
              className="add-button"
              onClick={clickAddButton}
            >
              Add
            </button>
          ) : (
            <Counter details={details} zeroQuantity={this.zeroQuantity} />
          )}
        </div>
      </li>
    )
  }
}

export default RenderItem
