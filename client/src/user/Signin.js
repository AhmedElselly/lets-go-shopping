import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		redirectToReferrer: false
	});

	const { email, password, error, loading, redirectToReferrer } = values;
	const {user} = isAuthenticated();

	const handleChage = name => event => {
		setValues({...values, error: false, [name]: event.target.value});
	}

	

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false, loading: true});
		signin({email, password})
		.then(data => {
			if(data.error) {
				setValues({...values, error: data.error, loading: false});
			} else {
				authenticate(data, () => {
					setValues({
					...values,
					redirectToReferrer: true
					})
				})
			}
		})
	}

	const signinForm = () => (
		<form className='container col-md-8 offset-md-2'>
			
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input value={email} onChange={handleChage('email')} type='email' className='form-control'/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input value={password} onChange={handleChage('password')} type='password' className='form-control'/>
			</div>
			<input onClick={clickSubmit} type='submit' className='btn btn-primary' value='Login'/>
		</form>
	)

	const showError = () => (
		<div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	)


	const showLoading = () => (
		loading && (<div className='alert alert-info'><h2>Loading...</h2></div>)
	)

	const redirectUser = () => {
		if(redirectToReferrer){
			if(user && user.role === 1){
				return <Redirect to='/admin/dashboard'/>
			} else {
				return <Redirect to='/user/dashboard'/>
			}
		}

		if(isAuthenticated()){
			return <Redirect to='/'/>
		}

	}
	return (
		<Layout title='Signin' description="What's going on in the world?!">
			{showError()}
			{showLoading()}
			{signinForm()}
			{redirectUser()}
		</Layout>
		)
}

export default Signin;