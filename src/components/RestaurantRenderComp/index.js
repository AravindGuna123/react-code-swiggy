/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantRenderComp = props => {
  const {details} = props
  const {userRating, name, imageUrl, id, cuisine} = details
  const {rating, totalReviews, ratingColor} = userRating

  return (
    <li className="each-restaurant-list" testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-link">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-image-props"
        />
      </Link>
      <div className="first-container-restaurant">
        <h1
          style={{
            fontSize: '14px',
            marginTop: '0px',
            fontWeight: 'bold',
            marginBottom: '5px',
          }}
        >
          {name}
        </h1>
        <p className="cuisine-text">{cuisine}</p>
        <div className="ratings-container">
          <AiFillStar style={{color: `${ratingColor}`, alignSelf: 'center'}} />
          <p style={{marginRight: '7px', marginLeft: '7px'}}>{rating}</p>
          <p>({totalReviews} ratings)</p>
        </div>
      </div>
    </li>
  )
}

export default RestaurantRenderComp
