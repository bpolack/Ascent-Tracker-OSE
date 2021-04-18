import React, { Component } from 'react';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import RegisterForm from '../../forms/RegisterForm/RegisterForm';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Register extends Component {
	render() {
		return (
			<Container className="LandingBackground" fluid>
				<Row>
					<Col>
						<HeroSection boxType="GlassBackground">
							<h1 className="text-center">Register</h1>
							<p className="BigText text-center mb-4">Sign up below to create your account.</p>
							<RegisterForm />
						</HeroSection>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Register
