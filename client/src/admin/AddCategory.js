import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './APIAdmin';


const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const {user, token} = isAuthenticated();

	const handleChange = (e) => {
		setError('');
		setName(e.target.value)
	}

	const clickSubmit = (e) => {
		e.preventDefault();
		setError('');
		setSuccess(false);

		// make  request to api to create a category
		createCategory(user._id, token, {name}).then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setError('');
				setSuccess(true);
			}
		})
	}

	const newCategory = () => (
		<form onSubmit={clickSubmit}>
			<label className='text-muted'>Name</label>
			<input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required/>
			<button className='btn btn-outline-primary'>Create Category</button>
		</form>
	)

	const showSuccess = () => {
		if(success) {
			return <h3 className='text-success'>{name} is create successfully</h3>
		}
	}

	const showError = () => {
		if(error) {
			return <h3 className='text-danger'>Category is should be unique</h3>
		}
	}

	const goBack = () => (
		<div className='mt-5'>
			<Link to='/admin/dashboard' >Back To Dashboard</Link>
		</div>
	)

	return (
		<Layout title='Add a new category' description= {`G'day ${user.name}, ready to add new category?`} className='container-fluid'>
			
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					{showSuccess()}
					{showError()}
					{newCategory()}
					{goBack()}
				</div>
			</div>
		</Layout>
	)
}

export default AddCategory;