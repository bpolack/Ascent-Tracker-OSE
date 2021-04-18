import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import PropTypes from 'prop-types';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class RegisterForm extends Component {
	constructor(props) {
		super(props);
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
		event.preventDefault();
		if (this.state.password !== this.state.password2) {
			this.props.setAlert('Passwords do not match', 'error');
		}
		else {

		}
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId="registerFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" name="firstName" onChange={this.handleChange} required />
				</Form.Group>
				<Form.Group controlId="registerLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" name="lastName" onChange={this.handleChange} required />
				</Form.Group>
				<Form.Group controlId="registerEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" name="email" onChange={this.handleChange} required />
				</Form.Group>
				<Form.Group controlId="registerPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" onChange={this.handleChange} required />
					<Form.Text id="passwordHelpBlock" muted>
						Password must be at least 8 characters long, and contain at least one number or symbol.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="registerPassword2">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name="password2" onChange={this.handleChange} required />
					<Form.Text id="passwordHelpBlock" muted>
						Confirm your password, by entering it a second time
					</Form.Text>
				</Form.Group>
				<Button className="px-4" variant="primary" type="submit">Sign Up</Button>
			</Form>
		)
	}
}

RegisterForm.propTypes = {
	setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(RegisterForm)
