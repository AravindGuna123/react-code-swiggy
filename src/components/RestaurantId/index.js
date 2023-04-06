/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Cookie from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RenderItem from '../RenderItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantId extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiData: {},
  }

  componentDidMount() {
    this.getIndividualRestaurant()
  }

  getIndividualRestaurant = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookie.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        rating: fetchedData.rating,
        name: fetchedData.name,
        id: fetchedData.id,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        costForTwo: fetchedData.cost_for_two,
        reviewsCount: fetchedData.reviews_count,
        opensAt: fetchedData.opens_at,
        location: fetchedData.location,
        foodItems: fetchedData.food_items.map(each => ({
          name: each.name,
          id: each.id,
          imageUrl: each.image_url,
          cost: each.cost,
          foodType: each.food_type,
        })),
      }
      this.setState({
        apiData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRestaurantId = () => {
    const {apiData} = this.state
    const {foodItems} = apiData
    return (
      <ul className="food-items-container">
        {foodItems.map(each => (
          <RenderItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoaderDetails = () => (
    <div
      className="products-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getEachRestaurantId = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantId()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderDetails()
      default:
        return null
    }
  }

  getRestaurantCard = () => {
    const {apiData} = this.state
    const {
      rating,
      name,
      id,
      imageUrl,
      costForTwo,
      location,
      reviewsCount,
      cuisine,
    } = apiData
    const ratingVal = Math.ceil(reviewsCount)
    return (
      <div className="card-container">
        <img src={imageUrl} alt="restaurant" className="card-image" />
        <div className="card-inner-container">
          <h1 className="name-small">{name}</h1>
          <p className="para-small">{cuisine}</p>
          <p className="para-small">{location}</p>
          <div className="rating-cost-container">
            <div className="ratings-card-container">
              <p style={{fontWeight: 'bold'}}>
                <AiFillStar /> {rating}
              </p>
              <p>{ratingVal}+ Ratings</p>
            </div>
            <hr
              style={{
                width: '1px',
                height: '50px',
                background: '#E2E8F0',
                border: 'none',
              }}
            />
            <div>
              <p style={{fontWeight: 'bold'}}>
                <BiRupee /> {costForTwo}
              </p>
              <p>Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="restaurantId-container">
        <Header />
        {this.getRestaurantCard()}
        {this.getEachRestaurantId()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantId
