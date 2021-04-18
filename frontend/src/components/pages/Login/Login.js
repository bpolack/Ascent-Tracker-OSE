import React, { Component } from 'react';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import LoginForm from '../../forms/LoginForm/LoginForm';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Login extends Component {
	render() {
		return (
			<Container className="LandingBackground" fluid>
				<Row>
					<Col>
						<HeroSection boxType="GlassBackground">
							<h1 className="text-center">Login</h1>
							<p className="BigText text-center mb-4">Login to your account below to access your snippets.</p>
							<LoginForm />
						</HeroSection>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Login
