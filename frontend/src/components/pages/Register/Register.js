import React, { Component } from 'react';

// Import Required Components
import FullCentered from '../../layout/FullCentered/FullCentered';
import RegisterForm from '../../forms/RegisterForm/RegisterForm';
import InlineBackgroundImage from '../../misc/InlineBackgroundImage/InlineBackgroundImage';
import backgroundImg from '../../../images/snippet-main-bg.jpg';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Register extends Component {
	render() {
		return (
			<Container className="LandingBackground" fluid>
				<InlineBackgroundImage image={backgroundImg} desc="Code Snippet Laptop Background Image" />
				<Row>
					<Col>
						<FullCentered boxType="Light">
							<h1 className="text-center">Register</h1>
							<p className="BigText text-center mb-4">Sign up below to create your account.</p>
							<RegisterForm />
						</FullCentered>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Register
