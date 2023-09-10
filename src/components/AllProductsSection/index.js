import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductsListSec from '../ProductsListSec'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
console.log(ratingsList)

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    categoryFilter: '',
    ratingId: '',
    apiStatus: 'loading',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: 'loading',
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, searchInput, categoryFilter, ratingId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}&category=${categoryFilter}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))

      this.setState({
        productsList: updatedData,
        apiStatus: 'success',
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: 'fail',
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  inputSearchChange = (key, value) => {
    if (key === 'Enter') {
      this.setState({searchInput: value}, this.getProducts)
    }
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, searchInput} = this.state
    if (productsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchInput={searchInput}
          inputSearchChange={this.inputSearchChange}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickCat = id => {
    this.setState({categoryFilter: id}, this.getProducts)
  }

  onClickRating = id => {
    this.setState({ratingId: id}, this.getProducts)
  }

  onFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
    </div>
  )

  removeFilters = () => {
    this.setState({categoryFilter: '', ratingId: ''}, this.getProducts)
  }
  // TODO: Add failure view

  render() {
    const {apiStatus} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          onClickCat={this.onClickCat}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onClickRating={this.onClickRating}
          removeFilters={this.removeFilters}
        />
        <ProductsListSec
          onFailure={this.onFailure}
          apiStatus={apiStatus}
          renderProductsList={this.renderProductsList}
          renderLoader={this.renderLoader}
        />
      </div>
    )
  }
}

export default AllProductsSection
