import React, {useState} from 'react';
import Layout from '../core/Layout';
import {API} from '../Config';
import {signup} from '../auth';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});

	const {name, email, password, error, success} = values;

	const handleChage = name => event => {
		setValues({...values, error: false, [name]: event.target.value});
	}

	

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false});
		signup({name, email, password})
		.then(data => {
			if(data.error) {
				setValues({...values, error: data.error, success: false});
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					success: true
				})
			}
		})
	}

	const signupForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input value={name} onChange={handleChage('name')} type='text' className='form-control'/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input value={email} onChange={handleChage('email')} type='email' className='form-control'/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input value={password} onChange={handleChage('password')} type='password' className='form-control'/>
			</div>
			<input onClick={clickSubmit} type='submit' className='btn btn-primary' value='Signup'/>
		</form>
	)

	const showError = () => (
		<div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	)


	const showSuccess = () => (
		<div className='alert alert-info' style={{display: success ? '' : 'none'}}>
			New Account is created please login
		</div>
	)
	return(
		<Layout title='Signup' description="New Here?! Signup." className='container col-md-8 offset-md-2'>
			{showSuccess()}
			{showError()}
			{signupForm()}
		</Layout>

		)
}

export default Signup;