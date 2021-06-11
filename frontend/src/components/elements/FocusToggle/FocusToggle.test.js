import React from 'react';
import { shallow } from 'enzyme';
import { FocusToggle } from './FocusToggle';
import { Switch } from "@headlessui/react";

describe('FocusToggle', () => {
	it("Renders correctly without crashing", () => {
		const setFocusMock = jest.fn();
		
		const wrapper = shallow(<FocusToggle setFocus={setFocusMock} focus={false} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("Renders as toggled with focus prop", () => {
		const setFocusMock = jest.fn();
		
		const wrapper = shallow(<FocusToggle setFocus={setFocusMock} focus={true} />);
		
		const toggleElement = wrapper.find(Switch); 
		expect(toggleElement.prop('checked')).toBe(true);
	});

	describe('When user clicks toggle', () => {
		it('setFocus is triggered with the opposite of focus bool', () => {
			const setFocusMock = jest.fn();

			const wrapper = shallow(<FocusToggle setFocus={setFocusMock} focus={false} />);

			const toggleElement = wrapper.find(Switch); 
			toggleElement.invoke('onChange')();

			expect(setFocusMock).toHaveBeenCalledTimes(1);
			expect(setFocusMock).toHaveBeenCalledWith(true);
		});
	});
});