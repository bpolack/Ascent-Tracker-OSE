import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimes, updateTime } from '../../../../../actions/time';
import './TimeCalendar.css';

// Fullcalendar component and plugins
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export class TimeCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDateClick = this.handleDateClick.bind(this);
	}

	componentDidMount() {
		this.mapTimestoEvents()
	}

	componentDidUpdate(prevProps) {
		if(prevProps.time.times.length !== this.props.time.times.length) {
			this.mapTimestoEvents()
		}
	}

	mapTimestoEvents() {
		if(this.props.time.times && this.props.time.times.length > 0) {
			const { times } = this.props.time;
			this.setState({
				events: times.map(time => {
							return {
								id: time._id,
								title: time.name,
								start: new Date(time.startDate),
								end: new Date(time.endDate)
							};
						})
			});
		}
	}

	handleEdit() {
		const { _id } = this.props.time;
		this.props.openEditModal(_id);
	}

	handleDelete() {
		const { _id } = this.props.time;
		this.props.openDeleteModal(_id);
	}

	handleDateClick(arg) {
		this.props.openNewModal(arg.dateStr);
	}

	// Data redux events into cal view
	// Create specific getTimes with date range param
	// Click event to open edit modal
	// Drag and drop to update time (start and end datetime)
	render() {
		return (
			<div>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView="timeGridWeek"
					headerToolbar={{
						start: 'title', 
						center: 'timeGridDay,timeGridWeek,dayGridMonth',
						end: 'today prev,next' 
					}}
					allDaySlot={false}
					events={this.state.events}
					dateClick={this.handleDateClick}
				/>
			</div>
		)
	}
}

TimeCalendar.propTypes = {
	getTimes: PropTypes.func.isRequired,
	updateTime: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	time: state.time
});

export default connect(mapStateToProps, { getTimes, updateTime })(TimeCalendar);