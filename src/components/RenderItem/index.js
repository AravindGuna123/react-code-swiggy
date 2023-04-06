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

  componentDidMount() {
    this.updateButton()
  }

  updateButton = () => {
    const {details} = this.props
    let filterItem
    const {id} = details
    const resultItem = JSON.parse(localStorage.getItem('cartData'))

    if (resultItem.length > 0) {
      filterItem = resultItem.filter(each => each.id === id)
    }

    if (filterItem !== undefined) {
      if (filterItem.length > 0) {
        this.setState({
          buttonVisible: false,
        })
      }
    }
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
      let filterCartItem
      const data = JSON.parse(localStorage.getItem('cartData'))
      if (data !== null) {
        filterCartItem = data.filter(each => each.id === id)
      }

      if (filterCartItem !== null) {
        const newItem = {
          id,
          name,
          imageUrl,
          cost,
          quantity: 1,
        }

        data.push(newItem)
        localStorage.setItem('cartData', JSON.stringify(data))
        this.setState(prevState => ({
          buttonVisible: !prevState.buttonVisible,
        }))
      }
    }

    return (
      <li testid="foodItem" className="food-item">
        <img src={imageUrl} alt="food" className="food-item-image" />
        <div className="foodItem-inner-container">
          <h1 className="name-small">{name}</h1>
          <p className="rate-small">
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
