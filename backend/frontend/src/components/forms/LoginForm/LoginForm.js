import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../actions/authentication';
import PropTypes from 'prop-types';


export class LoginForm extends Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
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
		const { email, password } = this.state;

		event.preventDefault();
		this.props.login(email, password);
	}

	render() {

		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return <Redirect to="/track" />;
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<label className="block mb-3">
					<span className="text-ascent-std">Email Address</span>
					<input type="email" name="email" onChange={this.handleChange} placeholder="hello@world.ca" className="form-ascent" required />
				</label>

				<label className="block mb-3">
					<span className="text-ascent-std">Password</span>
					<input type="password" name="password" onChange={this.handleChange} className="form-ascent" required />
				</label>
				<input className="cursor-pointer leading-none mx-2 px-5 py-3 font-semibold transition-colors rounded-full text-white bg-indigo-500 hover:bg-pink-500" type="submit" value="Login" />
			</form>
		)
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginForm)

