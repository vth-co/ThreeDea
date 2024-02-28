import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadOneProductThunk } from "../../store/product";
import * as cartActions from "../../store/productcart";
import { loadOneProductImageThunk } from "../../store/productimage";
import CreateReview from "../ReviewPage/CreateReview";
import ReviewsUnderProduct from "../ReviewPage/ReviewsUnderProduct";
import { loadProductReviewsThunk } from "../../store/review";
import { loadAllUsersThunk } from "../../store/user";

function SingleProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product);
  const imageObj = useSelector((state) => state.productImage);
  const image = Object.values(imageObj)

  const reviewsObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewsObj)
  const placeholderImageUrl = "https://3dea.s3.us-west-1.amazonaws.com/placeholder-image.webp"; // Replace this with your placeholder image URL
  
  const addToCart = () => {
    dispatch(cartActions.addProductCartThunk(product.id));
  };

  useEffect(() => {
    dispatch(loadOneProductThunk(id));
    dispatch(loadOneProductImageThunk(id));
    dispatch(loadProductReviewsThunk(id)); // Dispatch the reviews thunk
    dispatch(loadAllUsersThunk()); // Dispatch the users thunk
  }, [dispatch]);

  return (
    <>
      <div className="product-container">
        <div className="product left">
          <img
            src={image[0]?.image ? image[0].image : placeholderImageUrl}
            alt={product.productName}
            className="single-product-image"
          />
        </div>
        <div className="product right">
          <h1>{product.productName}</h1>
          <h3>${product.productPrice}</h3>
          <p>{product.productDescription}</p>
          <button onClick={addToCart} className="add-cart-btn">
            Add to cart
          </button>
        </div>
      </div>
      <div className="reviews-container">
        <CreateReview />
        <ReviewsUnderProduct product={product} reviews={reviews}/>
      </div>
    </>
  );
}

export default SingleProductPage;
