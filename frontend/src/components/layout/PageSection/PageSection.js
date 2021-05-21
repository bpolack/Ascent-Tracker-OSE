import React, { Component } from 'react'
import './PageSection.css';

export class PageSection extends Component {
	render() {
		const {filled, fullWidth} = this.props;
		
		return (
			<div className={`${filled ? 'bg-ascent-std dark:bg-opacity-0 text-ascent-std' : 'text-white'} page-container-screen w-full max-w-full px-8 py-24`}>
				<div className={`${fullWidth ? 'max-w-full' : 'max-w-5xl'} w-full mx-auto`}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default PageSection
