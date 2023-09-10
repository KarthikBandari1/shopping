const Rating = props => {
  const {onClickRating, eachObj} = props
  const {ratingId, imageUrl} = eachObj

  const ratingClicked = () => {
    onClickRating(ratingId)
  }
  return (
    <li onClick={ratingClicked}>
      <img src={imageUrl} alt="rating {ratingId}" />
      <p>&up</p>
    </li>
  )
}
export default Rating
