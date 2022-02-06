import React from 'react';

const ShowImage = ({item, url}) => (
    <div className='product-img'>
        <img className='mb-3' src={`https://mern-ecommerce-server.herokuapp.com/api/${url}/photo/${item._id}`} alt={item.name} style={{maxHeight: '100%', maxWidth: '100%'}} />
    </div>
)

export default ShowImage;