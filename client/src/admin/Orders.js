import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './APIAdmin';
import moment from 'moment';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    }


    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length > 0){
            return (
                <h1 className='text-danger display-2'>Total Orders: {orders.length}</h1>
            )
        } else {
            return <h1 className='text-danger'>No Orders!</h1>
        }
    }

    const showInput = (key, value) => (
        <div className='input-group mb-2 mr-sm-2'>
            <div className='input-group-prepend'>
                <div className='input-group-text'>
                    {key}
                </div>
                <input type='text' value={value} className='form-control' readOnly />
            </div>
        </div>
    )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error){
                console.log('Status update failed');
            } else {
                loadOrders();
            }
        })
    }

    const showStatus = (order) => (
        <div className='form-group'>
            <h3 className='mark mb-4'>Status: {order.status}</h3>
            <select className='form-control' onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>
        </div>
    )

    return (
		<Layout title='Orders' description= {`G'day ${user.name}, You can manage all the orders here?`} className='container-fluid'>
			
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showOrdersLength()}
					{orders.map((order, oIndex) => {
                        return (
                            <div className='mt-5' key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className='mb-5'>
                                    <span>Order ID: {order._id}</span>
                                </h2>

                                <ul className='list-group mb-2'>
                                    <li className='list-group-item'>
                                        {showStatus(order)}
                                    </li>
                                    <li className='list-group-item'>
                                        Transaction ID: {order.transaction_id}
                                    </li>
                                    <li className='list-group-item'>
                                        Amount: ${order.amount}
                                    </li>
                                    <li className='list-group-item'>
                                        Ordered by: {order.user.name}
                                    </li>
                                    <li className='list-group-item'>
                                        Order on: {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className='list-group-item'>
                                        User Address: {order.address}
                                    </li>
                                </ul>
                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total products in the order: {order.products.length}
                                </h3>
                                {order.products.map((product, pIndex) => (
                                    <div className='mb-4' key={pIndex} style={{padding: '20px', border:  '1px solid indigo'}}>
                                        {showInput('Product Name', product.name)}
                                        {showInput('Product Price', product.price)}
                                        {showInput('Product Total', product.count)}
                                        {showInput('Product ID', product._id)}
                                    </div>
                                ))}
                            </div>
                        )

                    })}
				</div>
			</div>
		</Layout>
	)
}

export default Orders;