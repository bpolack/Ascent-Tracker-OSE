import React, { Component } from 'react'

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class LoginForm extends Component {
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
		console.log('Email was submitted: ' + this.state.email);
		console.log('Password was submitted: ' + this.state.password);
		event.preventDefault();
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId="loginEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" name="email" onChange={this.handleChange} placeholder="hello@world.ca" required />
				</Form.Group>

				<Form.Group controlId="loginPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" onChange={this.handleChange} required />
				</Form.Group>
				<Button className="px-4" variant="primary" type="submit">Login</Button>
			</Form>
		)
	}
}

export default LoginForm
