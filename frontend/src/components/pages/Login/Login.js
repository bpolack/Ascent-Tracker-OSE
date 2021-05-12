import React, { Component } from 'react';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import LoginForm from '../../forms/LoginForm/LoginForm';

export class Login extends Component {
	render() {
		return (
			<div>
				<HeroSection filled={true}>
					<h1 className="heading-ascent-2 text-ascent-std text-center mb-1">Login</h1>
					<p className="heading-ascent-3 text-ascent-std text-center mb-6">Login to your account below to start tracking time.</p>
					<LoginForm />
					<p className="text-ascent-std text-xs text-center mt-3">No account? <a className="hover:text-pink-500" href="/register/">Sign up</a> now.</p>
				</HeroSection>
			</div>
		)
	}
}

export default Login
