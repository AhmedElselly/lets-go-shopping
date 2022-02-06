import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import Checkbox from './Checkbox';
import {getCategories} from '../admin/APIAdmin';
import {getFilteredProducts} from './apiCore';
import {prices} from './FixedPrices';
import Radiobox from './Radiobox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category:[], price: []}
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    }
    
    const loadFiltersResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    }

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>Load more</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFiltersResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log(filters, filterBy);

        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy === 'price'){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        }
        loadFiltersResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array; 
            }
        }
        return array;
    }


    return(	
		<Layout title='Shop Page' description="Search and find products for your choice!" className='container-fluid'>
            <div className='container'>
			<div className='row'>
                
                <div className='col-4'>
                    <h5>Filter By Categories</h5>
                    <ul>
                        <Checkbox handleFilters={filters => handleFilters(filters, 'category')} categories={categories}/>
                    </ul>

                    <h5>Filter By Prices</h5>
                    <div>
                        <Radiobox handleFilters={filters => handleFilters(filters, 'price')} prices={prices}/>
                    </div>
                </div>
                <div className='col-8'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {filteredResults.map((product, i) => (
                            <div key={i} className='col-4 mb-3'>
							    <Card product={product} />
						    </div>                            
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
            </div>
		</Layout>
    )
}

export default Shop;