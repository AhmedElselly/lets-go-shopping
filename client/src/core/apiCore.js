import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const list = (params) => {
    const query = queryString.stringify(params);
    console.log(`Query: ${query}`);
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/products/search?${query}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export const read = (productId) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/product/${productId}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}


export const listRelated = (productId) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/products/related/${productId}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`https://mern-ecommerce-server.herokuapp.com/api/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})

    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
}

