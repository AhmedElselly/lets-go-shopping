import React, {Fragment} from 'react';
import {Link, withRouter, useHistory} from 'react-router-dom';
import {logout, isAuthenticated} from '../auth';
import { itemTotal } from "./cartHelpers";


const Menu = () => {
		const history = useHistory();

	return(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <Link className="navbar-brand" to="/">Let's Go Shopping</Link>
			  <ul className='navbar-nav'>
				  <li className='nav-item'>
			  		<Link className="nav-link" to="/">Home</Link>
				  </li>
				  
				  <li className='nav-item'>
			  		<Link className="nav-link" to="/shop">Shop</Link>
				  </li>
			  </ul>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav ml-auto">
				<li className='nav-item'>
					<Link className="nav-link mr-2" to="/cart">
						Cart<sup className='cart-badge'>{itemTotal()}</sup>
					</Link>
				</li>
			      {!isAuthenticated() && (
			      	<div className='row'>
			      		<li className="nav-item">
				        	<Link  className="nav-link" to="/signup">Signup</Link>
				      	</li>
					     <li className="nav-item">
					        <Link className="nav-link" to="/signin">Signin</Link>
					     </li>
			      	</div>
			      	)}
					{/* <li className='nav-item'>
			  			<Link className="nav-link" to="/cart">
				  			Cart<sup className='cart-badge'>{itemTotal()}</sup>
						</Link>
				  	</li> */}

			      {isAuthenticated() && isAuthenticated().user.role === 0 && (
			      	<li className="nav-item">
				        <Link className="nav-link" to="/user/dashboard">User Dashboard</Link>
				    </li>

			      	)}

			      {isAuthenticated() && isAuthenticated().user.role === 1 && (
			      	<li className="nav-item">
				        <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
				    </li>

			      	)}

			      {isAuthenticated() && (
			      	<Fragment>
			      	<li className="nav-item">
				        <span className="nav-link" style = {{cursor: 'pointer'}} onClick={() => logout(() => {
				        	history.push('/');
				        })}>Logout</span>
			      	</li>
				    </Fragment>	
			      	)}
			    </ul>
			    
			  </div>
			</nav>
		)	
	}

export default Menu;