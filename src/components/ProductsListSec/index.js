const ProductsListSec = props => {
  const {apiStatus, renderProductsList, renderLoader, onFailure} = props
  switch (apiStatus) {
    case 'success':
      return renderProductsList()
    case 'fail':
      return onFailure()
    case 'loading':
      return renderLoader()
    default:
      return ''
  }
}
export default ProductsListSec
