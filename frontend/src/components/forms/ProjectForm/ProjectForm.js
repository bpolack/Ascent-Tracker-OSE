import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProject, updateProject, getProject } from '../../../actions/project';

export class ProjectForm extends Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			projectId: this.props.projectId,
			name: '',
			desc: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		// Load the project details if projectId is present 
		const { projectId } = this.props;
		if (projectId) {
			await this.props.getProject(projectId);
			this.setState({
				name: this.props.project.project.name,
				desc: this.props.project.project.desc
			});
		}
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const { projectId, name, desc } = this.state;

		event.preventDefault();
		if (projectId) {
			this.props.updateProject({ id: projectId, name, desc });
		}
		else {
			this.props.addProject({ name, desc });
		}
		this.props.closeModal();
	}

	render() {

		let submitText = "Add Project";
		if (this.state.projectId) {
			submitText = "Save";
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<label className="block mb-3">
					<span className="text-ascent-std">Project Name</span>
					<input type="text" name="name" onChange={this.handleChange} className="form-ascent" value={this.state.name} required />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Description</span>
					<textarea name="desc" onChange={this.handleChange} className="form-ascent h-32" value={this.state.desc} />
				</label>
				<input className="cursor-pointer leading-none mx-2 px-5 py-3 font-semibold transition-colors rounded-full text-white bg-indigo-500 hover:bg-pink-500" type="submit" value={submitText} />
			</form>
		)
	}
}

ProjectForm.propTypes = {
	getProject: PropTypes.func.isRequired,
	addProject: PropTypes.func.isRequired,
	updateProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	project: state.project
});

export default connect(mapStateToProps, { getProject, addProject, updateProject })(ProjectForm);