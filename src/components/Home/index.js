/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import Slider from 'react-slick'
import {MdOutlineSort} from 'react-icons/md'
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import Header from '../Header'
import RestaurantRenderComp from '../RestaurantRenderComp'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstantsOffers = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsRestaurants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatusOffer: apiStatusConstantsOffers.initial,
    apiStatusRest: apiStatusConstantsRestaurants.initial,
    offers: [],
    restaurantsList: [],
    activeSort: 'Highest',
    activePage: 1,
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaurantsApi()
  }

  getOffers = async () => {
    this.setState({
      apiStatusOffer: apiStatusConstantsOffers.inProgress,
    })

    const jwtToken = Cookie.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({
        offers: updatedData,
        apiStatusOffer: apiStatusConstantsOffers.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatusOffer: apiStatusConstantsOffers.failure,
      })
    }
  }

  getRestaurantsApi = async () => {
    const {activeSort, activePage} = this.state
    const offset = (activePage - 1) * 9
    this.setState({
      apiStatusRest: apiStatusConstantsRestaurants.inProgress,
    })

    const jwtToken = Cookie.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${activeSort}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: {
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
          rating: each.user_rating.rating,
        },
        name: each.name,
        hasTableBooked: each.has_table_booked,
        isDeliveringTwo: each.is_delivering_two,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        groupByTime: each.group_by_time,
        opensAt: each.opens_at,
        location: each.location,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatusRest: apiStatusConstantsRestaurants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatusRest: apiStatusConstantsRestaurants.failure,
      })
    }
  }

  renderLoaderOffer = () => (
    <div
      className="products-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderLoaderRest = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderOffers = () => {
    const {offers} = this.state

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="slider-props">
        <Slider {...settings}>
          {offers.map(each => (
            <div key={each.id}>
              <img src={each.imageUrl} alt="offer" className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  getOffersSwitch = () => {
    const {apiStatusOffer} = this.state
    switch (apiStatusOffer) {
      case apiStatusConstantsOffers.success:
        return this.renderOffers()
      case apiStatusConstantsOffers.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstantsOffers.inProgress:
        return this.renderLoaderOffer()
      default:
        return null
    }
  }

  clickMinus = () => {
    const {activePage} = this.state
    console.log(activePage)
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsApi,
      )
    }
  }

  clickPlus = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsApi,
      )
    }
  }

  renderRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurant-list-container">
        {restaurantsList.map(each => (
          <RestaurantRenderComp details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  getRestaurantsList = () => {
    const {apiStatusRest} = this.state
    switch (apiStatusRest) {
      case apiStatusConstantsRestaurants.success:
        return this.renderRestaurants()
      case apiStatusConstantsRestaurants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstantsRestaurants.inProgress:
        return this.renderLoaderOffer()
      default:
        return null
    }
  }

  changeOption = event => {
    this.setState(
      {
        activeSort: event.target.value,
      },
      this.getRestaurantsApi,
    )
  }

  render() {
    const {activePage} = this.state

    return (
      <div className="home-main-container">
        <Header />
        {this.getOffersSwitch()}
        <div className="popular-container">
          <h1>Popular Restaurants</h1>
          <div className="sort-main-container">
            <p>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-container">
              <MdOutlineSort style={{marginRight: '10px'}} />
              <select onChange={this.changeOption}>
                {sortByOptions.map(each => (
                  <option value={each.value} key={each.id}>
                    Sort by {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr className="horizontal-props" />
        {this.getRestaurantsList()}
        <div className="offset-container">
          <button
            type="button"
            onClick={this.clickMinus}
            className="page-buttons"
            testid="pagination-left-button"
          >
            <AiOutlineMinusSquare style={{marginRight: '5px'}} />
          </button>
          <p>
            <span testid="active-page-number">{activePage}</span> of 4
          </p>
          <button
            type="button"
            onClick={this.clickPlus}
            className="page-buttons"
            testid="pagination-right-button"
          >
            <AiOutlinePlusSquare style={{marginLeft: '5px'}} />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
