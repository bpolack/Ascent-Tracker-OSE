import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../../../actions/project';
import Loader from "react-loader-spinner";

// Import Required Components
import ProjectCard from './ProjectCard/ProjectCard';
import PageSection from '../../../layout/PageSection/PageSection';

export class Projects extends Component {

	componentDidMount() {
		this.props.getProjects();
	}

	render() {
		const { projects, loading } = this.props.project;

		return (
			<PageSection filled={true} fullWidth={false}>
				<h1 className="heading-ascent-2">Your Projects</h1>
				{
					loading ? (
						<Loader
							type="Puff"
							color="#6366f1"
							height={100}
							width={100}
							timeout={5000}
						/>
					) : (
						<div>
							{projects.map((project) => (
								<ProjectCard key={project._id} project={project} />
							))}
						</div>
					)
				}
			</PageSection>
		)
	}
}

Projects.propTypes = {
	getProjects: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	project: state.project
});

export default connect(mapStateToProps, { getProjects })(Projects);