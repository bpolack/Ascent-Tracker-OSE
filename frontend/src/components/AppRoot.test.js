import React from 'react';
import { shallow } from 'enzyme';
import { AppRoot } from './AppRoot';

describe('AppRoot', () => {
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<AppRoot focus={true} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("Renders the correct classname for dark mode", () => {
		const wrapper = shallow(<AppRoot focus={true} />);
		expect(wrapper.find('div.dark').exists()).toBeTruthy();
	});
	it("Renders the correct classname for light mode", () => {
		const wrapper = shallow(<AppRoot focus={false} />);
		expect(wrapper.find('div.dark').exists()).toBeFalsy();
	});
});