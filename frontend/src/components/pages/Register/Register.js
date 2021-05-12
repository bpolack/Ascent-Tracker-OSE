import React, { Component } from 'react';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import RegisterForm from '../../forms/RegisterForm/RegisterForm';

export class Register extends Component {
	render() {
		return (
			<div>
				<HeroSection filled={true}>
					<h1 className="heading-ascent-2 text-ascent-std text-center mb-1">Register</h1>
					<p className="heading-ascent-3 text-ascent-std text-center mb-6">Sign up below to create your account.</p>
					<RegisterForm />
				</HeroSection>
			</div>
		)
	}
}

export default Register
