import React, { Component } from 'react'
import './FullCentered.css';

export class FullCentered extends Component {
	render() {
		const boxClass = "FullCentered " + this.props.boxType;
		return (
			<div className="FullCenteredContainer">
				<div className={boxClass}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default FullCentered
