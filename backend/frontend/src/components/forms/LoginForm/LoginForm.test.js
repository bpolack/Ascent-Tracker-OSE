import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
	it("Renders correctly without crashing", () => {
		const loginMock = jest.fn();

		const wrapper = shallow(<LoginForm isAuthenticated={false} login={loginMock} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user changes input', () => {
		it('form state is updated', () => {
			const loginMock = jest.fn();
			const preventDefault = jest.fn();

			const wrapper = shallow(<LoginForm isAuthenticated={false} login={loginMock} />);

			// Change value of input field
			const inputElement = wrapper.find('input').first();
			inputElement.simulate('change', { preventDefault, target: { name: 'email', value: 'testing@testing.com' } });

			// Check that state has updated to match
			expect(wrapper.state('email')).toEqual("testing@testing.com");
		});
	});

	describe('When user submits the form', () => {
		it('details are passed to login function', () => {
			const loginMock = jest.fn();
			const preventDefault = jest.fn();

			const wrapper = shallow(<LoginForm isAuthenticated={false} login={loginMock} />);

			// Set values and simulate submit
			const formElement = wrapper.find('form');
			const nameElement = wrapper.find('input[name="email"]');
			const passElement = wrapper.find('input[name="password"]');
			nameElement.simulate('change', { preventDefault, target: { name: 'email', value: 'testing@testing.com' } });
			passElement.simulate('change', { preventDefault, target: { name: 'password', value: 'Access1234!!!' } });
			formElement.simulate('submit', { preventDefault });

			// Check that mock function called & with correct params
			expect(loginMock).toHaveBeenCalledTimes(1);
			expect(loginMock).toHaveBeenCalledWith('testing@testing.com', 'Access1234!!!');
		});
	});
});