import React, { Component } from 'react'
import './Landing.css';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class Landing extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Col>
						<HeroSection>
							<h1 className="LightHeading text-center">Ascent Tracker</h1>
							<h4 className="LightHeading text-center mb-4">Easily track time, and better manage your projects.</h4>
							<div className="text-center">
								<Button href="/register/" className="mx-2 px-4" variant="light">Sign Up</Button>{' '}
								<Button href="/login/" className="mx-2 px-4" variant="primary">Login</Button>
							</div>
						</HeroSection>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Landing
