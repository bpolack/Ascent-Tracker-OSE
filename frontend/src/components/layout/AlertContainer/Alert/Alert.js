import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../actions/alert';
import PropTypes from 'prop-types';
import { Transition } from "@headlessui/react";

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: true
		};

		this.handleDismiss = this.handleDismiss.bind(this);
	}

	handleDismiss() {
		this.setState({
			isShowing: false
		});
		setTimeout(() => {
			const id = this.props.alertId;
			this.props.removeAlert(id);
		}, 200);
	}

	render() {

		let alertColor;
		switch (this.props.alertType) {
			case "Error":
				alertColor = "bg-red-600";
				break;
			case "Warning":
				alertColor = "bg-yellow-400";
				break;
			case "Success":
				alertColor = "bg-green-700";
				break;
			default:
				alertColor = "bg-gray-400";
		}

		return (
			<Transition
				appear={true}
				show={this.state.isShowing}
				enter="transition-opacity duration-100"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="w-full relative bg-ascent-std text-ascent-std px-3 py-2 mt-2 rounded-md shadow-lg border-solid border-transparent dark:border-white dark:border-opacity-30 border-t border-b">
					<div>
						<span className={`inline-block ${alertColor} w-3 h-3 rounded-full mr-2`}></span>
						<strong><span>{this.props.alertType}</span></strong>
					</div>
					<div>{this.props.msg}</div>
					<div className="absolute top-1 right-2 cursor-pointer hover:opacity-70" onClick={this.handleDismiss} >
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			</Transition>
		)
	}
}

Alert.propTypes = {
	removeAlert: PropTypes.func.isRequired
}

export default connect(null, { removeAlert })(Alert)
