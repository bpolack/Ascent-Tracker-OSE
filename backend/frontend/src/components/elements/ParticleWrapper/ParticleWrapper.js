import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Library Components
import Particles from 'react-particles-js';

export class ParticleWrapper extends Component {

	renderParticles(hidden) {
		if (!hidden) {
			return (
				<Particles className="h-full"
					params={{
						"fps_limit": 30,
						"particles": {
							"collisions": {
								"enable": false
							},
							"number": {
								"value": 6,
								"density": {
									"enable": false
								}
							},
							"size": {
								"value": 260,
								"random": true,
								"anim": {
									"speed": 3,
									"size_min": 0.3
								}
							},
							"opacity": {
								"animation": {
									"speed": 0.33,
									"minimumValue": 0.7
								}
							},
							"line_linked": {
								"enable": false
							},
							"move": {
								"random": true,
								"speed": 0.7,
								"direction": "none",
								"out_mode": "out"
							}
						}
					}} />
			)
		}
	}

	render() {

		const { focus } = this.props;

		return (
			<div className="absolute inset-0">
				{this.renderParticles(focus)}
			</div>
		)
	}
}

ParticleWrapper.propTypes = {
	focus: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	focus: state.focus
});

export default connect(mapStateToProps)(ParticleWrapper)