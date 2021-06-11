import React from 'react';
import { shallow } from 'enzyme';
import PillButton from './PillButton';

describe('PillButton', () => {
	
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<PillButton link="https://polackdevelopment.com" varient="color">Test Button</PillButton>);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user clicks PillButton', () => {
		it('calls the correct onClick function', () => {
			const onButtonClickMock = jest.fn();
			
			const wrapper = shallow(
				<PillButton buttonClickEvent={onButtonClickMock} varient="color">Test Button</PillButton>,
			);

			const buttonElement = wrapper.find('a'); 
			buttonElement.simulate('click'); 

			expect(onButtonClickMock).toHaveBeenCalledTimes(1);
		});
	});
});