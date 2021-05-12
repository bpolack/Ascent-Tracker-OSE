import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../actions/authentication';
import PropTypes from 'prop-types';

export class RegisterForm extends Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			fname: '',
			lname: '',
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const { fname, lname, email, password } = this.state;

		event.preventDefault();
		this.props.register({ fname, lname, email, password });
	}

	render() {

		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return <Redirect to="/track" />;
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<label className="block mb-3">
					<span className="text-ascent-std">First Name</span>
					<input type="text" name="fname" onChange={this.handleChange} className="form-ascent"  required />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Last Name</span>
					<input type="text" name="lname" onChange={this.handleChange} className="form-ascent"  required />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Email Address</span>
					<input type="email" name="email" onChange={this.handleChange} placeholder="hello@world.ca" className="form-ascent" required />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Password</span>
					<input type="password" name="password" onChange={this.handleChange} className="form-ascent" required />
					<span className="text-ascent-std text-xs">Password must be at least 8 characters long, and contain at least one number or symbol.</span>
				</label>
				<input className="cursor-pointer leading-none mx-2 px-5 py-3 font-semibold transition-colors rounded-full text-white bg-indigo-500 hover:bg-pink-500" type="submit" value="Sign Up" />
			</form>
		)
	}
}

RegisterForm.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps, { register })(RegisterForm)
