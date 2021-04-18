import React, { Component } from 'react'
import './HeroSection.css';

export class HeroSection extends Component {
	render() {
		let boxClass = "HeroContents ";
		if (this.props.boxType) {
			boxClass += this.props.boxType;
		}
		return (
			<div className="HeroSectionContainer">
				<div className={boxClass}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default HeroSection
