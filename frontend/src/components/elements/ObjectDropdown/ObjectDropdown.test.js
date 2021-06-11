import React from 'react';
import { shallow } from 'enzyme';
import { ObjectDropdown } from './ObjectDropdown';

describe('ObjectDropdown', () => {
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<ObjectDropdown />);
		expect(wrapper).toMatchSnapshot();
	});
});