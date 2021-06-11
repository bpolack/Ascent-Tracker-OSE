import React, { Component } from 'react'

// Import Required Components
import ObjectDropdown from '../../../../elements/ObjectDropdown/ObjectDropdown';

export class ProjectCard extends Component {
	constructor(props) {
		super(props);

		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit() {
		const { _id } = this.props.project;
		this.props.openEditModal(_id);
	}

	handleDelete() {
		const { _id } = this.props.project;
		this.props.openDeleteModal(_id);
	}

	render() {

		const { name, desc } = this.props.project;

		return (
			<div className="relative bg-ascent-std text-ascent-std shadow transition-all p-6 rounded-xl">
				<h2 className="heading-ascent-3 mt-8">{name}</h2>
				<p className="mb-2">{desc}</p>
				<ObjectDropdown handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
			</div>
		)
	}
}

export default ProjectCard
