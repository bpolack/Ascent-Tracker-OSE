import React, { Component } from 'react'

export class PillButton extends Component {
	render() {

		let style = 'text-gray-800 bg-white hover:text-white hover:bg-pink-500';
		if (this.props.varient === 'color') {
			style = 'text-white bg-indigo-500 hover:bg-pink-500';
		}
		else if (this.props.varient === 'dark') {
			style = 'bg-gray-800 text-white hover:text-white hover:bg-pink-500';
		}

		return (
			<a href={this.props.link} onClick={this.props.buttonClickEvent} className={`cursor-pointer inline-block leading-none mx-2 px-5 py-3 font-semibold transition-colors rounded-full ${style} ${this.props.className}`}>
				{this.props.children}
			</a>
		)
	}
}

export default PillButton
