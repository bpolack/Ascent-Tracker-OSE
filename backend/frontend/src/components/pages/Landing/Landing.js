import React, { Component } from 'react'

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import PillButton from '../../elements/PillButton/PillButton';

export class Landing extends Component {
	render() {
		return (
			<div>
				<HeroSection>
					<h1 className="heading-ascent-1 text-white text-center mb-1">Ascent Tracker</h1>
					<p className="heading-ascent-3 text-white text-center mb-6">Easily track time, and better manage your projects.</p>
					<div className="text-center">
						<PillButton link="/register/" varient="color">Sign Up</PillButton>
						<PillButton link="/login/" varient="light">Login</PillButton>
					</div>
				</HeroSection>
			</div>
		)
	}
}

export default Landing
