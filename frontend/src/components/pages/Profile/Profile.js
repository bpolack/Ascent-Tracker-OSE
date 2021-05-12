import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Required Components
import PageSection from '../../layout/PageSection/PageSection';

export class Profile extends Component {
	render() {
		return (
			<PageSection filled={true} fullWidth={false}>
				<h1 className="heading-ascent-2">Your Profile</h1>
				<p className="heading-ascent-3">First Name - {this.props.authentication.user.fname}</p>
				<p className="heading-ascent-3">Last Name - {this.props.authentication.user.lname}</p>
				<p className="heading-ascent-3">Email - {this.props.authentication.user.email}</p>
			</PageSection>
		)
	}
}

Profile.propTypes = {
	authentication: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authentication: state.authentication
});

export default connect(mapStateToProps)(Profile);