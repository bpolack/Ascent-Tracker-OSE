import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects, deleteProject } from '../../../../actions/project';
import { v4 as uuidv4 } from 'uuid';
import Loader from "react-loader-spinner";

// Import Required Components
import ProjectCard from './ProjectCard/ProjectCard';
import PageSection from '../../../layout/PageSection/PageSection';
import PillButton from '../../../elements/PillButton/PillButton';
import Popup from '../../../elements/Popup/Popup';
import ProjectForm from '../../../forms/ProjectForm/ProjectForm';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export class Projects extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newModalShowing: false,
			editModalShowing: false,
			deleteModalShowing: false,
			editProjectId: null,
			deleteProjectId: null
		};

		this.openNewModal = this.openNewModal.bind(this);
		this.closeNewModal = this.closeNewModal.bind(this);
		this.openEditModal = this.openEditModal.bind(this);
		this.closeEditModal = this.closeEditModal.bind(this);
		this.openDeleteModal = this.openDeleteModal.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
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
	openEditModal(projectId) {
		this.setState({
			editModalShowing: true,
			editProjectId: projectId
		});
	}
	closeEditModal(){
		this.setState({
			editModalShowing: false
		});
	}
	openDeleteModal(projectId) {
		this.setState({
			deleteModalShowing: true,
			deleteProjectId: projectId
		});
	}
	closeDeleteModal(){
		this.setState({
			deleteModalShowing: false
		});
	}

	handleDelete() {
		const { deleteProjectId } = this.state;
		if (deleteProjectId) {
			this.props.deleteProject(deleteProjectId);
			this.closeDeleteModal();
		}
	}

	renderProjects() {
		const { projects, error } = this.props.project;

		if (projects && projects.length > 0) {
			return (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{projects.map((project) => (
						<ProjectCard 
							key={project._id} 
							project={project}
							openEditModal={this.openEditModal}
							openDeleteModal={this.openDeleteModal}
						/>
					))}
				</div>
			)
		}
		else if (error.errors) {
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
		const { editProjectId } = this.state;

		return (
			<PageSection filled={true} fullWidth={false}>
				<div className="flex flex-wrap items-start justify-between mb-2">
					<h1 className="heading-ascent-2 mr-4"><FontAwesomeIcon className="mr-1" icon={faFolderOpen} /> Your Projects</h1>
					<PillButton buttonClickEvent={this.openNewModal} varient="color">Create Project</PillButton>
				</div>
				<Popup title="Create New Project" open={this.state.newModalShowing} closeModal={this.closeNewModal}>
					<ProjectForm closeModal={this.closeNewModal} />
				</Popup>
				<Popup title="Edit Project" open={this.state.editModalShowing} closeModal={this.closeEditModal}>
					<ProjectForm projectId={editProjectId} closeModal={this.closeEditModal} />
				</Popup>
				<Popup title="Delete Project" open={this.state.deleteModalShowing} closeModal={this.closeDeleteModal}>
					<p className="text-red-600 mb-4"><b>Are you sure?</b></p>
					<PillButton buttonClickEvent={this.handleDelete} varient="color">Confirm</PillButton>
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
	deleteProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	project: state.project
});

export default connect(mapStateToProps, { getProjects, deleteProject })(Projects);