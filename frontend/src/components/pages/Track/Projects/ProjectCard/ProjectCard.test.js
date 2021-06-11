import React from 'react';
import { shallow } from 'enzyme';
import { ProjectCard } from './ProjectCard';
import ObjectDropdown from '../../../../elements/ObjectDropdown/ObjectDropdown';

describe('ProjectCard', () => {
	it("Renders correctly without crashing", () => {
		const openEditMock = jest.fn();
		const openDeleteMock = jest.fn();
		const project = {
			_id: "asdf1234",
			name: "Cart Title",
			desc: "Testing this card"
		};

		const wrapper = shallow(<ProjectCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} project={project} />);
		expect(wrapper).toMatchSnapshot();
	});
	describe('When user clicks edit', () => {
		it("invokes the passed openModal prop for editing", () => {
			const openEditMock = jest.fn();
			const openDeleteMock = jest.fn();
			const project = {
				_id: "asdf1234",
				name: "Cart Title",
				desc: "Testing this card"
			};

			const wrapper = shallow(<ProjectCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} project={project} />);

			const dropdownElement = wrapper.find(ObjectDropdown);
			dropdownElement.invoke('handleEdit')();

			expect(openEditMock).toHaveBeenCalledTimes(1);
			expect(openEditMock).toHaveBeenCalledWith("asdf1234");
		});
	});

	describe('When user clicks delete', () => {
		it("invokes the passed openModal prop for deleting", () => {
			const openEditMock = jest.fn();
			const openDeleteMock = jest.fn();
			const project = {
				_id: "asdf1234",
				name: "Cart Title",
				desc: "Testing this card"
			};

			const wrapper = shallow(<ProjectCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} project={project} />);

			const dropdownElement = wrapper.find(ObjectDropdown);
			dropdownElement.invoke('handleDelete')();

			expect(openDeleteMock).toHaveBeenCalledTimes(1);
			expect(openDeleteMock).toHaveBeenCalledWith("asdf1234");
		});
	});
});