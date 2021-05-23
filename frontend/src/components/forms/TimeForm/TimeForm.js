import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTime, updateTime, getTime } from '../../../actions/time';
import { getProjects } from '../../../actions/project';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import './TimeForm.css';

export class TimeForm extends Component {
	constructor(props) {
		super(props);

		const endDate = this.props.startTime ? new Date(this.props.startTime) : new Date();
		endDate.setHours( endDate.getHours() + 1 );

		// Initial state
		this.state = {
			projectOptions: [],
			timeId: this.props.timeId,
			name: '',
			selectedProject: {
				_id: '',
				name: ''
			},
			startDate: this.props.startTime ? new Date(this.props.startTime) : new Date(),
			endDate: endDate,
			desc: '',
			refLink: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
		this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		// Load all the projects
		await this.props.getProjects();

		if (this.props.project.projects) {
			// Map projects to select options array
			this.setState({
				projectOptions: this.props.project.projects.map(project => {
					return {
						value: project._id,
						label: project.name
					};
				})
			});
		}

		// Load the time details if timeId is present 
		const { timeId } = this.props;
		if (timeId) {
			await this.props.getTime(timeId);
			this.setState({
				name: this.props.time.time.name,
				startDate: new Date(this.props.time.time.startDate),
				endDate: new Date(this.props.time.time.endDate),
				desc: this.props.time.time.desc,
				refLink: this.props.time.time.refLink
			});
			try {
				this.setState({
					selectedProject: {
						_id: this.props.time.time.project._id,
						name: this.props.time.time.project.name
					}
				});
			} catch(err) {
				this.setState({
					selectedProject: {
						_id: '',
						name: ''
					}
				});
			}
		}
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSelectChange(selected) {
		if (selected) {
			this.setState({
				selectedProject: { _id: selected.value, name: selected.label }
			});
		}
		else {
			this.setState({
				selectedProject: { _id: '', name: '' }
			});
		}
	}

	handleStartTimeChange(dateTime) {
		if (dateTime) {
			this.setState({
				startDate: dateTime
			});
		}
		else {
			this.setState({
				startDate: new Date()
			});
		}
	}

	handleEndTimeChange(dateTime) {
		if (dateTime) {
			this.setState({
				endDate: dateTime
			});
		}
		else {
			const endDate = new Date();
			endDate.setHours( endDate.getHours() + 1 );
			this.setState({
				endDate: endDate
			});
		}
	}

	handleSubmit(event) {
		const { timeId, name, selectedProject, startDate, endDate, desc, refLink } = this.state;

		event.preventDefault();
		if (timeId) {
			this.props.updateTime({ id: timeId, name, project: selectedProject._id, startDate, endDate, desc, refLink });
		}
		else {
			this.props.addTime({ name, project: selectedProject._id, startDate, endDate, desc, refLink });
		}
		this.props.closeModal();
	}

	render() {

		let submitText = "Add Time";
		if (this.state.timeId) {
			submitText = "Save";
		}
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				boxShadow: "none"
				// You can also use state.isFocused to conditionally style based on the focus state
			})
		};

		return (
			<form onSubmit={this.handleSubmit}>
				<label className="block mb-3">
					<span className="text-ascent-std">Title</span>
					<input type="text" name="name" onChange={this.handleChange} className="form-ascent" value={this.state.name} required />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Start Time</span>
					<DateTimePicker
						name="startDate" 
						className="form-ascent p-2"
						onChange={this.handleStartTimeChange}
						value={this.state.startDate}
						locale="en-US"
						disableClock={true}
						required={true}
					/>
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">End Time</span>
					<DateTimePicker
						name="endDate" 
						className="form-ascent p-2"
						onChange={this.handleEndTimeChange}
						value={this.state.endDate}
						locale="en-US"
						disableClock={true}
						required={true}
					/>
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Project</span>
					<Select 
						name="selectedProject" 
						className="text-gray-800 form-ascent react-select-override" 
						styles={customSelectStyles} 
						onChange={this.handleSelectChange} 
						isClearable={true} 
						value={{value: this.state.selectedProject._id, label: this.state.selectedProject.name}} 
						options={this.state.projectOptions} 
					/>
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Description</span>
					<textarea name="desc" onChange={this.handleChange} className="form-ascent h-32" value={this.state.desc || ''} />
				</label>
				<label className="block mb-3">
					<span className="text-ascent-std">Reference Link</span>
					<input type="text" name="refLink" onChange={this.handleChange} className="form-ascent" value={this.state.refLink || ''} />
				</label>
				<input className="cursor-pointer leading-none mx-2 px-5 py-3 font-semibold transition-colors rounded-full text-white bg-indigo-500 hover:bg-pink-500" type="submit" value={submitText} />
			</form>
		)
	}
}

TimeForm.propTypes = {
	getTime: PropTypes.func.isRequired,
	addTime: PropTypes.func.isRequired,
	updateTime: PropTypes.func.isRequired,
	getProjects: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	time: state.time,
	project: state.project
});

export default connect(mapStateToProps, { getTime, addTime, updateTime, getProjects })(TimeForm);