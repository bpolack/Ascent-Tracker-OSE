import React, { Component } from 'react'
import './Landing.css';

// Import Required Components
import FullCentered from '../../layout/FullCentered/FullCentered';
import InlineBackgroundImage from '../../misc/InlineBackgroundImage/InlineBackgroundImage';
import backgroundImg from '../../../images/snippet-main-bg.jpg';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class Landing extends Component {
	render() {
		return (
			<Container className="LandingBackground" fluid>
				<InlineBackgroundImage image={backgroundImg} desc="Code Snippet Laptop Background Image" />
				<Row>
					<Col>
						<FullCentered>
							<h1 className="LightHeading text-center">InfinuSnip</h1>
							<h4 className="LightHeading text-center mb-4">Create and Save Your Code Snippets For Easy Access</h4>
							<div className="text-center">
								<Button href="/register/" className="mx-2 px-4" variant="light">Sign Up</Button>{' '}
								<Button href="/login/" className="mx-2 px-4" variant="success">Login</Button>
							</div>
						</FullCentered>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Landing
