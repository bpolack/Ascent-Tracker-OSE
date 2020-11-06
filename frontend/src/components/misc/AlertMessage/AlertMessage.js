import React, { Component } from 'react'

// Bootstrap Components
import Toast from 'react-bootstrap/Toast';

export class AlertMessage extends Component {
	render() {
		return (
			<Toast>
				<Toast.Header>
					<strong className="mr-auto"><span className={this.props.type}>{this.props.type}</span></strong>
					<small>{this.props.title}</small>
				</Toast.Header>
				<Toast.Body>{this.props.message}</Toast.Body>
			</Toast>
		)
	}
}

export default AlertMessage
