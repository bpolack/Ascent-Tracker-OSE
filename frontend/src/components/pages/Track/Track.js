import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Required Components
import HeroSection from '../../layout/HeroSection/HeroSection';
import PillButton from '../../elements/PillButton/PillButton';

export class Track extends Component {

	render() {

		return (
			<div>
				<HeroSection>
					<h1 className="heading-ascent-1 text-white text-center mb-1">Welcome Back</h1>
					<p className="heading-ascent-3 text-white text-center mb-6">Hello {this.props.authentication.user.fname}. Select a task below.</p>
					<div className="text-center">
						<PillButton link="/track/projects" varient="color">Manage Projects</PillButton>
						<PillButton link="/track/time" varient="color">Track Time</PillButton>
					</div>
				</HeroSection>
			</div>
		)
	}
}

Track.propTypes = {
	authentication: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authentication: state.authentication
});

export default connect(mapStateToProps)(Track);