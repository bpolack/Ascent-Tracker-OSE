import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimesRange, updateTime, clearUpdated } from '../../../../../actions/time';
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

		this.handleDates = this.handleDates.bind(this);
		this.handleEventClick = this.handleEventClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDateClick = this.handleDateClick.bind(this);
	}

	componentDidMount() {

	}

	// Re-map time to events after add new or remove time chunks
	componentDidUpdate(prevProps) {
		try {
			if (prevProps.time.times.length !== this.props.time.times.length) {
				this.mapTimestoEvents();
			}
			else if (this.props.time.dataUpdated && prevProps.time.dataUpdated !== this.props.time.dataUpdated) {
				this.mapTimestoEvents();
				this.props.clearUpdated();
			}
		} catch (err) {
			// times is null
		}
	}

	// Runs every time the date range of the calendar changes
	handleDates(rangeInfo) {
		this.props.getTimesRange(rangeInfo.startStr, rangeInfo.endStr);
		try {
			if (this.props.time.times.length > 0) {
				this.mapTimestoEvents();
			}
		} catch (err) {
			// times is null
		}
	}

	mapTimestoEvents() {
		if (this.props.time.times && this.props.time.times.length > 0) {
			const { times } = this.props.time;
			this.setState({
				events: times.map(time => {
					return {
						id: time._id,
						title: time.name,
						project: time.project ? time.project._id : '',
						start: new Date(time.startDate),
						end: new Date(time.endDate),
						desc: time.desc,
						refLink: time.refLink
					};
				})
			});
		}
	}

	// Open edit modal when event is clicked
	handleEventClick(clickInfo) {
		this.props.openEditModal(clickInfo.event.id);
	}

	// Update event automatically when event is dragged or resized
	handleEventChange = (changedInfo) => {

		const updatedEvent = changedInfo.event.toPlainObject()

		this.props.updateTime({ 
			id: updatedEvent.id, 
			name: updatedEvent.title, 
			project: updatedEvent.extendedProps.project, 
			startDate: updatedEvent.start, 
			endDate: updatedEvent.end, 
			desc: updatedEvent.extendedProps.desc, 
			refLink: updatedEvent.extendedProps.refLink 
		});
		
	}

	handleDelete() {
		const { _id } = this.props.time;
		this.props.openDeleteModal(_id);
	}

	handleDateClick(arg) {
		this.props.openNewModal(arg.dateStr);
	}

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
					editable={true}
					events={this.state.events}
					datesSet={this.handleDates}
					eventClick={this.handleEventClick}
					eventChange={this.handleEventChange} // called for drag-n-drop/resize
					dateClick={this.handleDateClick}
				/>
			</div>
		)
	}
}

TimeCalendar.propTypes = {
	getTimesRange: PropTypes.func.isRequired,
	updateTime: PropTypes.func.isRequired,
	clearUpdated: PropTypes.func.isRequired,
	time: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	time: state.time
});

export default connect(mapStateToProps, { getTimesRange, updateTime, clearUpdated })(TimeCalendar);