import './index.css'
import Rating from '../Rating'

const FiltersGroup = props => {
  const {
    removeFilters,
    categoryOptions,
    onClickCat,
    ratingsList,
    onClickRating,
  } = props

  const onClickCatBut = event => {
    switch (event.target.textContent) {
      case categoryOptions[0].name:
        onClickCat(categoryOptions[0].categoryId)
        break
      case categoryOptions[1].name:
        onClickCat(categoryOptions[1].categoryId)
        break
      case categoryOptions[2].name:
        onClickCat(categoryOptions[2].categoryId)
        break
      case categoryOptions[3].name:
        onClickCat(categoryOptions[3].categoryId)
        break
      case categoryOptions[4].name:
        onClickCat(categoryOptions[4].categoryId)
        break
      default:
        break
    }
  }

  const clearFilters = () => {
    removeFilters()
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>

      {categoryOptions.map(each => (
        <p onClick={onClickCatBut}>{each.name}</p>
      ))}

      <p>Rating</p>
      <ul>
        {ratingsList.map(each => (
          <Rating eachObj={each} onClickRating={onClickRating} />
        ))}
      </ul>
      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
