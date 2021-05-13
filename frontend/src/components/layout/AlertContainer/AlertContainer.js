import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 

import Alert from './Alert/Alert';

export class AlertContainer extends Component {

	render() {

		const { alerts } = this.props;

		if (alerts && alerts.length > 0) {
			return (
				<div className="fixed z-50 bottom-5 right-5 w-full max-w-xs max-h-64">
					{alerts.map(alert => <Alert key={alert.id} alertId={alert.id} alertType={alert.alertType} msg={alert.msg} />)}
				</div>
			)
		}
		else {
			return (
				<div className="fixed bottom-4 right-4 w-full max-w-xs max-h-64"></div>
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
