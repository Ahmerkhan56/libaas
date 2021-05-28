import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET,PRODUCT_REVIEW_DELETE_RESET } from '../constants/productConstants';
import Swal from 'sweetalert2'


export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const reviewId  =props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [reviews,setReviews]=useState([])

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successReviewCreate,
    success: successDelete,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_REVIEW_DELETE_RESET });
    }
    dispatch(detailsProduct(productId ));
  }, [dispatch, productId, successReviewCreate, successDelete]);
 /* const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
  success: successDelete,
  } = reviewDelete;*/

  const deleteHandler = async(productId, reviewId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
      dispatch( await deleteReview(productId, reviewId));
      window.location.reload();  
    }
    })
  };
  return (
    <div>
       {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/productlist">Back to result</Link>
           <div>
            <h2 id="reviews">Reviews</h2>
           
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            {product.reviews.length !== 0 &&(
            <table className="table">
            <thead>
            <tr>
            <th>ID</th>
            <th>NAME</th>
              <th>RATING</th>
              <th>DATE</th>
              <th>COMMENT</th>
              <th>ACTION</th>
            </tr>
            </thead>
            <tbody>
              {product.reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review._id}</td>
                  <td><strong>{review.name}</strong></td>
                  <td><Rating rating={review.rating} caption=" "></Rating></td>
                  <td>{review.createdAt.substring(0, 10)}</td>
                  <td>{review.comment}</td>
                  <td><button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product._id, review._id)}
                  >
                    Delete
                  </button></td>
                </tr>
              ))}
              </tbody>
              </table>
             ) }
          </div>
        </div>
        )}
    </div>
  );
}