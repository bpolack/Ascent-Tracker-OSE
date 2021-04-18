import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AlertContainer.css'; 

import Alert from './Alert/Alert';

export class AlertContainer extends Component {

	render() {

		const { alerts } = this.props;

		if (alerts && alerts.length > 0) {
			return (
				<div className="AlertContainer">
					{alerts.map(alert => <Alert key={alert.id} alertId={alert.id} alertType={alert.alertType} msg={alert.msg} />)}
				</div>
			)
		}
		else {
			return (
				<div className="AlertContainer"></div>
			)
		}

	}
}

AlertContainer.propTypes = {
	alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(AlertContainer)
