import React from 'react';
import { shallow } from 'enzyme';
import { TimeForm } from './TimeForm';

describe('TimeForm', () => {
	it("Renders correctly without crashing", () => {
		const getTimeMock = jest.fn();
		const addTimeMock = jest.fn();
		const updateTimeMock = jest.fn();
		const getProjectsMock = jest.fn();
		const project = {};
		const time = {};

		const wrapper = shallow(
			<TimeForm
				getTime={getTimeMock}
				addTime={addTimeMock}
				updateTime={updateTimeMock}
				getProjects={getProjectsMock}
				project={project}
				time={time}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
	
});