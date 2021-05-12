import React, { Component } from 'react'
import './HeroSection.css';

export class HeroSection extends Component {
	render() {
		
		const {filled} = this.props;

		return (
			<div className="hero-container-screen py-20 flex items-center justify-center">
				<div className={`${filled ? 'bg-ascent-std' : ''} max-w-680 px-7 py-9 rounded-lg`}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default HeroSection
