import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimes, deleteTime } from '../../../../actions/time';
import { v4 as uuidv4 } from 'uuid';
import Loader from "react-loader-spinner";

// Import Required Components
import TimeCard from './TimeCard/TimeCard';
import TimeCalendar from './TimeCalendar/TimeCalendar';
import PageSection from '../../../layout/PageSection/PageSection';
import PillButton from '../../../elements/PillButton/PillButton';
import Popup from '../../../elements/Popup/Popup';
import TimeForm from '../../../forms/TimeForm/TimeForm';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThList, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export class Time extends Component {

	constructor(props) {
		super(props);
		this.state = {
			calendarView: false,
			newModalShowing: false,
			newModalStartTime: null,
			editModalShowing: false,
			deleteModalShowing: false,
			editTimeId: null,
			deleteTimeId: null
		};

		this.changeCalendarView = this.changeCalendarView.bind(this);
		this.openNewModal = this.openNewModal.bind(this);
		this.closeNewModal = this.closeNewModal.bind(this);
		this.openEditModal = this.openEditModal.bind(this);
		this.closeEditModal = this.closeEditModal.bind(this);
		this.openDeleteModal = this.openDeleteModal.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.getTimes();
	}

	changeCalendarView(calendar) {
		this.setState({
			calendarView: calendar
		});
		if (!calendar) {
			// CLEAR TIMES THEN GET NORMAL TIMES
			this.props.getTimes();
		}
	}

	openNewModal(startTime) {
		this.setState({
			newModalShowing: true,
			newModalStartTime: startTime ? startTime : null
		});
	}
	closeNewModal() {
		this.setState({
			newModalShowing: false
		});
		if (!this.state.calendarView) {
			this.props.getTimes(); 
		}
	}
	openEditModal(timeId) {
		this.setState({
			editModalShowing: true,
			editTimeId: timeId
		});
	}
	closeEditModal(){
		this.setState({
			editModalShowing: false
		});
		if (!this.state.calendarView) {
			this.props.getTimes();
		}
	}
	openDeleteModal(timeId) {
		this.setState({
			deleteModalShowing: true,
			deleteTimeId: timeId
		});
	}
	closeDeleteModal(){
		this.setState({
			deleteModalShowing: false
		});
	}

	handleDelete() {
		const { deleteTimeId } = this.state;
		if (deleteTimeId) {
			this.props.deleteTime(deleteTimeId);
			this.closeDeleteModal();
		}
	}

	renderTimes() {
		const { times, error } = this.props.time;

		if (times && times.length > 0) {
			return (
				<div className="grid grid-cols-1 gap-5">
					{times.map((time) => (
						<TimeCard 
							key={time._id} 
							time={time}
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

	renderCalendarToggle() {
		const { calendarView } = this.state;

		let listStyle, calStyle;
		listStyle = calStyle = 'text-white bg-indigo-500 hover:bg-pink-500';
		if (calendarView) {
			calStyle = 'text-white bg-pink-500';
		}
		else {
			listStyle = 'text-white bg-pink-500';
		}

		return (
			<div className="ml-auto">
				<div onClick={() => {this.changeCalendarView(false)}} className={`${listStyle} cursor-pointer inline-block leading-none ml-2 px-5 py-3 font-semibold transition-colors rounded-l-full`}>
					<FontAwesomeIcon className="mr-1" icon={faThList} /> List
				</div>
				<div onClick={() => {this.changeCalendarView(true)}} className={`${calStyle} cursor-pointer inline-block leading-none mr-2 px-5 py-3 font-semibold transition-colors rounded-r-full`}>
					<FontAwesomeIcon className="mr-1" icon={faCalendarAlt} /> Calendar
				</div>
			</div>
		)
	}

	renderCalendar() {
		return (
			<TimeCalendar 
				openNewModal={this.openNewModal} 
				openEditModal={this.openEditModal} 
				openDeleteModal={this.openDeleteModal} 
			/>
		)

	}

	render() {
		const { loading } = this.props.time;
		const { calendarView, editTimeId } = this.state;

		return (
			<PageSection filled={true} fullWidth={false}>
				<div className="flex flex-wrap items-start mb-2">
					<h1 className="heading-ascent-2 mr-4"><FontAwesomeIcon className="mr-1" icon={faClock} /> { calendarView ? 'Your Calendar' : 'Latest Time'}</h1>
					{this.renderCalendarToggle()}
					<PillButton buttonClickEvent={() => {this.openNewModal(null)}} varient="color">Add Time</PillButton>
				</div>
				<Popup title="New Time" open={this.state.newModalShowing} closeModal={this.closeNewModal}>
					<TimeForm startTime={this.state.newModalStartTime} closeModal={this.closeNewModal} />
				</Popup>
				<Popup title="Edit Time" open={this.state.editModalShowing} closeModal={this.closeEditModal}>
					<TimeForm timeId={editTimeId} closeModal={this.closeEditModal} />
				</Popup>
				<Popup title="Delete Time" open={this.state.deleteModalShowing} closeModal={this.closeDeleteModal}>
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
						calendarView ? (
							this.renderCalendar()
						) : (
							this.renderTimes()
						)
					)
				}
			</PageSection>
		)
	}
}

Time.propTypes = {
	getTimes: PropTypes.func.isRequired,
	deleteTime: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	time: state.time
});

export default connect(mapStateToProps, { getTimes, deleteTime })(Time);