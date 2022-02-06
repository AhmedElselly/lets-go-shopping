import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({product, showViewProductButton = true, cartUpdate=false, showRemoveButton = false, showAddToCartButton = true, setRun = f => f, run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    const showViewButton = (showViewProductButton) => {
        return (
          showViewProductButton && (
            <Link to={`/product/${product._id}`} className='mr-3'>
                <button className='btn btn-info mt-2 mb-2'>View product</button>
            </Link>
          )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
     return showAddToCartButton && (
        <button onClick={addToCart} className='btn btn-warning mt-2 mb-2'>Add To Cart</button>
     )
    }

   

    const showRemoveProductButton = (showRemoveButton) => {
        return showRemoveButton && (
           <button onClick={() => {
            removeItem(product._id);
            setRun(!run);
           }} className='btn btn-danger mt-2 mb-2'>Remove product</button>
        )
    }


    const showStock = quantity => {
     return  quantity > 0 ? (
        <span className='badge badge-info badge-pill'>In stock</span>
     ) : (
        <span className='badge badge-danger badge-pill'>Out of stock</span>
     )
    }

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = (cartUpdate) => {
      return cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust quantity</span>
            </div>
            <input type='number' className='form-control' value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    }

    return (
      <div className='card'>
          <div className='card-header name'>{product.name}</div>
          <ShowImage item={product} url='product' />
          <div className='card-body'>
              {shouldRedirect(redirect)}
              <p>{product.description.substring(0, 20)}...</p>
              <p className='black-10'>${product.price}</p>
              <p className='black-9'>Category: {product.category && product.category.name }</p>
              <p className='black-8'>
                  Added on {moment(product.createdAt).fromNow()}
              </p>
              
                  {showStock(product.quantity)}
              <br/>
              {showViewButton(showViewProductButton)}
              {showRemoveProductButton(showRemoveButton)}
              {showAddToCart(showAddToCartButton)}
              {showCartUpdateOptions(cartUpdate)}
          </div>
      </div>
    )
}

export default Card;