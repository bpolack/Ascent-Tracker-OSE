import React, { Component } from 'react'
import './InlineBackgroundImage.css';

export class InlineBackgroundImage extends Component {
	render() {
		return (
			<div className="InlineBackgroundImage">
				<img src={this.props.image} alt={this.props.desc} />
			</div>
		)
	}
}

export default InlineBackgroundImage
