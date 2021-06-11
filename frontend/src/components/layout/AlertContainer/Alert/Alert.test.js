import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from './Alert';
import { Transition } from "@headlessui/react";

describe('Alert', () => {
	it("Renders correctly without crashing", () => {
		const removeAlertMock = jest.fn();
		
		const wrapper = shallow(<Alert removeAlert={removeAlertMock} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user clicks dismiss', () => {
		it('alert is hidden and removeAlert is triggered with the correct alert ID', () => {
			const removeAlertMock = jest.fn();
			const alert = {
				id: 'asdf1234',
				alertType: 'Error',
				msg: 'This is a test alert'
			};

			const wrapper = shallow(
				<Alert 
					removeAlert={removeAlertMock} 
					alertId={alert.id} 
					alertType={alert.alertType} 
					msg={alert.msg}
				/>
			);

			// Check the Alert visibilty beforehand
			expect(wrapper.find(Transition).prop('show')).toBe(true);

			const dismissElement = wrapper.find('.alert-dismiss-button'); 
			dismissElement.simulate('click'); 
			
			// Check the Alert visibilty afterwards
			expect(wrapper.find(Transition).prop('show')).toBe(false);
			
			setTimeout(() => {
				expect(removeAlertMock).toHaveBeenCalledTimes(1);
				expect(removeAlertMock).toHaveBeenCalledWith('asdf1234');
			}, 500);
		});
	});
});