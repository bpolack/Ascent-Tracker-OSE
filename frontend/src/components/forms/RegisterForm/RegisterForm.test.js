import React from 'react';
import { shallow } from 'enzyme';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
	it("Renders correctly without crashing", () => {
		const registerMock = jest.fn();

		const wrapper = shallow(<RegisterForm isAuthenticated={false} register={registerMock} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('When user changes input', () => {
		it('form state is updated', () => {
			const registerMock = jest.fn();
			const preventDefault = jest.fn();

			const wrapper = shallow(<RegisterForm isAuthenticated={false} register={registerMock} />);

			// Change value of input field
			const fnameElement = wrapper.find('input[name="fname"]');
			const lnameElement = wrapper.find('input[name="lname"]');
			const emailElement = wrapper.find('input[name="email"]');
			const passElement = wrapper.find('input[name="password"]');
			fnameElement.simulate('change', { preventDefault, target: { name: 'fname', value: 'John' } });
			lnameElement.simulate('change', { preventDefault, target: { name: 'lname', value: 'Smith' } });
			emailElement.simulate('change', { preventDefault, target: { name: 'email', value: 'testing@testing.com' } });
			passElement.simulate('change', { preventDefault, target: { name: 'password', value: 'Access1234!!!' } });
			
			// Check that state has updated to match
			expect(wrapper.state('fname')).toEqual("John");
			expect(wrapper.state('lname')).toEqual("Smith");
			expect(wrapper.state('email')).toEqual("testing@testing.com");
			expect(wrapper.state('password')).toEqual("Access1234!!!");
		});
	});

	describe('When user submits the form', () => {
		it('details are passed to register function', () => {
			const registerMock = jest.fn();
			const preventDefault = jest.fn();

			const wrapper = shallow(<RegisterForm isAuthenticated={false} register={registerMock} />);

			// Set values and simulate submit
			const formElement = wrapper.find('form');
			const fnameElement = wrapper.find('input[name="fname"]');
			const lnameElement = wrapper.find('input[name="lname"]');
			const emailElement = wrapper.find('input[name="email"]');
			const passElement = wrapper.find('input[name="password"]');
			fnameElement.simulate('change', { preventDefault, target: { name: 'fname', value: 'John' } });
			lnameElement.simulate('change', { preventDefault, target: { name: 'lname', value: 'Smith' } });
			emailElement.simulate('change', { preventDefault, target: { name: 'email', value: 'testing@testing.com' } });
			passElement.simulate('change', { preventDefault, target: { name: 'password', value: 'Access1234!!!' } });
			formElement.simulate('submit', { preventDefault });

			// Check that mock function called & with correct params
			expect(registerMock).toHaveBeenCalledTimes(1);
			expect(registerMock).toHaveBeenCalledWith({"fname": "John", "lname": "Smith", "email": "testing@testing.com", "password": "Access1234!!!"});
		});
	});
});