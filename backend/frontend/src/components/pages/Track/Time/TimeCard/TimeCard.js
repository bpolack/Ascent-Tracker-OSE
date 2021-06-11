import React, { Component } from 'react'
import Moment from 'moment';

// Import Required Components
import ObjectDropdown from '../../../../elements/ObjectDropdown/ObjectDropdown';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export class TimeCard extends Component {
	constructor(props) {
		super(props);

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit() {
		const { _id } = this.props.time;
		this.props.openEditModal(_id);
	}

	handleDelete() {
		const { _id } = this.props.time;
		this.props.openDeleteModal(_id);
	}

	render() {

		const { name, startDate, endDate, project, desc, refLink } = this.props.time;
		const totalHours = Moment(endDate).diff(Moment(startDate)) / 3600000; 

		return (
			<div className="relative flex flex-wrap bg-ascent-std text-ascent-std shadow transition-all p-6 rounded-xl">
				<div className="bg-gray-400 text-center bg-opacity-30 rounded py-4 px-5 mr-6 mt-8 md:mt-0">
					<p className="pb-1 mb-1 border-b border-gray-800 dark:border-white "><b>{totalHours} Hours</b></p>
					<p>Start: {Moment(startDate).format('MM-DD-YYYY h:mma')}</p>
					<p>End: {Moment(endDate).format('MM-DD-YYYY h:mma')}</p>
				</div>
				<div className="w-full md:w-1/2 mt-5 md:mt-0">
					{ 
						project ? (
							<span className="bg-pink-500 rounded text-white text-xs px-2 py-0.5">{project.name}</span>
						) : (
							<span className="rounded text-white text-xs px-2 py-0.5">&nbsp;</span>
						)
					}
					<h2 className="heading-ascent-3 mt-2">
						{name} 
						{
							refLink ? (
								<a href={refLink} rel="noreferrer" target="_blank"><FontAwesomeIcon className="ml-2 text-base hover:text-pink-500" icon={faLink} /></a>
							) : (
								<span></span>
							)
						}
					</h2>
					<p className="mb-2">{desc}</p>
				</div>
				<ObjectDropdown handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
			</div>
		)
	}
}

export default TimeCard;