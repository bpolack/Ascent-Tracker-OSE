import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { Transition } from "@headlessui/react";

describe('Header', () => {
	it("Renders correctly without crashing", () => {
		const logoutMock = jest.fn();

		const wrapper = shallow(<Header logout={logoutMock} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user clicks menuToggle', () => {
		it('mobile nav menu is shown after click toggle button', () => {
			const logoutMock = jest.fn();
			
			const wrapper = shallow(<Header logout={logoutMock} />);

			// Check the Mobile Nav visibilty beforehand
			expect(wrapper.find(Transition).prop('show')).toBe(false);

			// Trigger the click function
			const toggleElement = wrapper.find('.mobile-nav-toggle'); 
			toggleElement.simulate('click'); 

			// Check the Mobile Nav visibilty after click
			expect(wrapper.find(Transition).prop('show')).toBe(true);
		});
	});

	describe('When user is authenticated', () => {
		it('logout button is visible', () => {
			const logoutMock = jest.fn();
			
			const wrapper = shallow(<Header logout={logoutMock} isAuthenticated={true} />);

			const logoutElement = wrapper.find('.logout-button').first(); 
			expect(logoutElement.exists()).toBeTruthy();
		});
	});
});