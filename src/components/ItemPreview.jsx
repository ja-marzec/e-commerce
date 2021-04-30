import { loadCartItems, openPreview} from '../app/slice';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function ItemPreview(props) {
    console.log("PREVIEW PROPS", props);

    const dispatch = useDispatch();

    function closeItemPreview() {
        dispatch(openPreview({open: false, product: {}}))
    }

    return (
    <div>
         <button onClick={() => closeItemPreview() }>  <Link to="/"> CLOSE </Link>  </button>
         AAAAAAAAAA
    </div>
    )
}