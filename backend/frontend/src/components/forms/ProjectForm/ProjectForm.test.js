import React from 'react';
import { shallow } from 'enzyme';
import { ProjectForm } from './ProjectForm';

describe('ProjectForm', () => {
	it("Renders correctly without crashing", () => {
		const getProjectMock = jest.fn();
		const addProjectMock = jest.fn();
		const updateProjectMock = jest.fn();
		const project = {};

		const wrapper = shallow(
			<ProjectForm
				getProject={getProjectMock}
				addProject={addProjectMock}
				updateProject={updateProjectMock}
				project={project}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user changes input', () => {
		it('form state is updated', () => {
			const getProjectMock = jest.fn();
			const addProjectMock = jest.fn();
			const updateProjectMock = jest.fn();
			const project = {};
			const preventDefault = jest.fn();

			const wrapper = shallow(
				<ProjectForm
					getProject={getProjectMock}
					addProject={addProjectMock}
					updateProject={updateProjectMock}
					project={project}
				/>
			);

			// Change form input values
			const nameElement = wrapper.find('input[name="name"]');
			const descElement = wrapper.find('textarea[name="desc"]');
			nameElement.simulate('change', { preventDefault, target: { name: 'name', value: 'Test Project' } });
			descElement.simulate('change', { preventDefault, target: { name: 'desc', value: 'Lorem Ipsum 123456' } });

			// Check that state has updated to match
			expect(wrapper.state('name')).toEqual("Test Project");
			expect(wrapper.state('desc')).toEqual("Lorem Ipsum 123456");
		});
	});

	describe('When user submits the form for a new project', () => {
		it('details are passed to addProject function', () => {
			const getProjectMock = jest.fn();
			const addProjectMock = jest.fn();
			const updateProjectMock = jest.fn();
			const project = {};
			const preventDefault = jest.fn();
			const closeModalMock = jest.fn();

			const wrapper = shallow(
				<ProjectForm
					getProject={getProjectMock}
					addProject={addProjectMock}
					updateProject={updateProjectMock}
					project={project}
					closeModal={closeModalMock} 
				/>
			);

			// Change form input values
			const formElement = wrapper.find('form');
			const nameElement = wrapper.find('input[name="name"]');
			const descElement = wrapper.find('textarea[name="desc"]');
			nameElement.simulate('change', { preventDefault, target: { name: 'name', value: 'Test Project' } });
			descElement.simulate('change', { preventDefault, target: { name: 'desc', value: 'Lorem Ipsum 123456' } });
			formElement.simulate('submit', { preventDefault });

			// Check that mock function called & with correct params
			expect(addProjectMock).toHaveBeenCalledTimes(1);
			expect(addProjectMock).toHaveBeenCalledWith({"name": "Test Project", "desc": "Lorem Ipsum 123456"});
		});
	});
});