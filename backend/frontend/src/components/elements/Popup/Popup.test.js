import React from 'react';
import { shallow } from 'enzyme';
import { Popup } from './Popup';
import { Dialog } from "@headlessui/react";

describe('Popup', () => {
	it("Renders correctly without crashing", () => {
		const closeModalMock = jest.fn();
		
		const wrapper = shallow(<Popup closeModal={closeModalMock} focus={false} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user clicks close', () => {
		it('setFocus is triggered with the opposite of focus bool', () => {
			const closeModalMock = jest.fn();

			const wrapper = shallow(<Popup closeModal={closeModalMock} focus={false} />);

			const toggleElement = wrapper.find(Dialog); 
			toggleElement.invoke('onClose')();

			expect(closeModalMock).toHaveBeenCalledTimes(1);
		});
	});
});