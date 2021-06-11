import React from 'react';
import { shallow } from 'enzyme';
import { AlertContainer } from './AlertContainer';

describe('AlertContainer', () => {
	it("Renders correctly without crashing", () => {
		const alerts = [];
		const wrapper = shallow(<AlertContainer alerts={alerts} />);
		expect(wrapper).toMatchSnapshot();
	});
});