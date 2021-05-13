import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../../../actions/project';
import { v4 as uuidv4 } from 'uuid';
import Loader from "react-loader-spinner";

// Import Required Components
import ProjectCard from './ProjectCard/ProjectCard';
import PageSection from '../../../layout/PageSection/PageSection';
import PillButton from '../../../elements/PillButton/PillButton';
import Popup from '../../../elements/Popup/Popup';
import ProjectForm from '../../../forms/ProjectForm/ProjectForm';

export class Projects extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newModalShowing: false,
			editModalShowing: false,
		};

		this.openNewModal = this.openNewModal.bind(this);
		this.closeNewModal = this.closeNewModal.bind(this);
	}

	componentDidMount() {
		this.props.getProjects();
	}

	openNewModal() {
		this.setState({
			newModalShowing: true
		});
	}
	closeNewModal() {
		this.setState({
			newModalShowing: false
		});
	}

	openEditModal() {
		this.setState({
			editModalShowing: true
		});
	}
	closeEditModal(){
		this.setState({
			editModalShowing: true
		});
	}

	renderProjects() {
		const { projects, error } = this.props.project;

		if (projects && projects.length > 0) {
			return (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{projects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			)
		}
		else {
			return (
				<div>
					{error.errors.map((err) => (
						<div key={uuidv4()} className="py-2 text-lg">{err.msg}</div>
					))}
				</div>
			)
		}
		
	}

	render() {
		const { loading } = this.props.project;

		return (
			<PageSection filled={true} fullWidth={false}>
				<div className="flex flex-wrap items-start justify-between mb-2">
					<h1 className="heading-ascent-2 mr-4">Your Projects</h1>
					<PillButton buttonClickEvent={this.openNewModal} varient="color">Create Project</PillButton>
				</div>
				<Popup title="Create New Project" open={this.state.newModalShowing} closeModal={this.closeNewModal}>
					<ProjectForm closeModal={this.closeNewModal} />
				</Popup>
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
						this.renderProjects()
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