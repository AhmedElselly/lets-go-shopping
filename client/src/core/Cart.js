import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=> {
        console.log('MAX DEPTH ...');
        setItems(getCart);
    }, [run]);


    const showItems = items => {
        return(
          <div>
            <h2>Your cart has {`${items.length}`} items</h2>
            {
              items.map((products, i) => (
                <Card key={i} product={products} cartUpdate={true} showRemoveButton={true} showAddToCartButton={false} setRun={setRun} run={run} />
              ))
            }
          </div>
      )
    }

    const noItemMessage = () => {
        return(
            <h2>Your cart is empty. <br/> <Link to='/shop'>Start Shopping</Link></h2>
        )
    }

    return(	
		<Layout title='Shopping Cart' description="Manage your cart items, and purchase." className='container-fluid'>
			<div className='row'>
                <div className='col-6'>
                    {items.length > 0 ? showItems(items) : noItemMessage()}
                </div>
                <div className='col-6'>
                    <h2 className='mb-4'>Your cart summary</h2>
                    <hr/>
                    <Checkout products={items} />
                </div>
            </div>
		</Layout>
    )
    
}

export default Cart;