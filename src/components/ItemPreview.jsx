import { loadCartItems, openPreview} from '../app/slice';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function ItemPreview() {

    const product = useSelector(state => state.shop.itemPreview.product)

    console.log(product);

    const dispatch = useDispatch();

    function closeItemPreview() {
        dispatch(openPreview({open: false, product: {}}))
    }

    return (
    <div>
         <div className="product__card"
      >
        <img className="product__image" src={product.media?.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <div className="product__details">
        <p className="product__description">
            {product.description}
          </p>
            <p className="product__price">
            {product.price?.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
      <button onClick={() => closeItemPreview() }>  <Link to="/"> CLOSE </Link>  </button>
    </div>
    )
}