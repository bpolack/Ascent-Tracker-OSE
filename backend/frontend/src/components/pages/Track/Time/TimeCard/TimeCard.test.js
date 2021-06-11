import React from 'react';
import { shallow } from 'enzyme';
import { TimeCard } from './TimeCard';
import ObjectDropdown from '../../../../elements/ObjectDropdown/ObjectDropdown';

describe('TimeCard', () => {
	it("Renders correctly without crashing", () => {
		const openEditMock = jest.fn();
		const openDeleteMock = jest.fn();
		const time = {
			_id: "asdf123456",
			name: "Time Card Title",
			desc: "Testing this card",
			startDate: new Date(),
			endDate: new Date(),
			project: "projectnum",
			refLink: "testlink"
		};

		const wrapper = shallow(<TimeCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} time={time} />);
		expect(wrapper).toMatchSnapshot();
	});
	describe('When user clicks edit', () => {
		it("invokes the passed openModal prop for editing", () => {
			const openEditMock = jest.fn();
			const openDeleteMock = jest.fn();
			const time = {
				_id: "asdf123456",
				name: "Time Card Title",
				desc: "Testing this card",
				startDate: new Date(),
				endDate: new Date(),
				project: "projectnum",
				refLink: "testlink"
			};

			const wrapper = shallow(<TimeCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} time={time} />);

			const dropdownElement = wrapper.find(ObjectDropdown);
			dropdownElement.invoke('handleEdit')();

			expect(openEditMock).toHaveBeenCalledTimes(1);
			expect(openEditMock).toHaveBeenCalledWith("asdf123456");
		});
	});

	describe('When user clicks delete', () => {
		it("invokes the passed openModal prop for deleting", () => {
			const openEditMock = jest.fn();
			const openDeleteMock = jest.fn();
			const time = {
				_id: "asdf123456",
				name: "Time Card Title",
				desc: "Testing this card",
				startDate: new Date(),
				endDate: new Date(),
				project: "projectnum",
				refLink: "testlink"
			};

			const wrapper = shallow(<TimeCard openEditModal={openEditMock} openDeleteModal={openDeleteMock} time={time} />);

			const dropdownElement = wrapper.find(ObjectDropdown);
			dropdownElement.invoke('handleDelete')();

			expect(openDeleteMock).toHaveBeenCalledTimes(1);
			expect(openDeleteMock).toHaveBeenCalledWith("asdf123456");
		});
	});
});