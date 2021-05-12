import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setFocus } from '../../../actions/focus';
import PropTypes from 'prop-types';

// Other Components
import { Switch } from "@headlessui/react";

export class FocusToggle extends Component {

	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleFocus(event) {
		this.props.setFocus(!this.props.focus);
	}

	render() {

		const { focus } = this.props;

		return (
			<div className="bg-ascent-std absolute top-4 left-5 p-3 rounded-full z-20">
				<Switch.Group>
					<div className="flex items-center">
						<Switch.Label className="mr-4 text-ascent-std">Focus Mode</Switch.Label>
						<Switch
							checked={focus}
							onChange={this.handleFocus}
							className={`${focus ? "bg-pink-500" : "bg-gray-700"} 
									relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
						>
							<span
								className={`${focus ? "translate-x-6" : "translate-x-1"} 
									inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
							/>
						</Switch>
					</div>
				</Switch.Group>
			</div>
		)
	}
}

FocusToggle.propTypes = {
	setFocus: PropTypes.func.isRequired,
	focus: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	focus: state.focus
});

export default connect(mapStateToProps, { setFocus })(FocusToggle)
