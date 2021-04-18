import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../actions/alert';
import PropTypes from 'prop-types';
import './Alert.css'; 

// Bootstrap Components
import Toast from 'react-bootstrap/Toast';

export class Alert extends Component {
	constructor(props) {
		super(props);
		this.handleDismiss = this.handleDismiss.bind(this);
	}

	handleDismiss() {
		const id = this.props.alertId;
		this.props.removeAlert(id);
	}

	render() {
		return (
			<Toast className="Alert" onClose={this.handleDismiss}>
				<Toast.Header>
					<strong className="mr-auto"><span className={`alert-type-${this.props.alertType}`}>{this.props.alertType}</span></strong>
					<small>Alert</small>
				</Toast.Header>
				<Toast.Body>{this.props.msg}</Toast.Body>
			</Toast>
		)
	}
}

Alert.propTypes = {
	removeAlert: PropTypes.func.isRequired
}

export default connect(null, { removeAlert })(Alert)
