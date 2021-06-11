import React from 'react';
import { shallow } from 'enzyme';
import { PageSection } from './PageSection';

describe('PageSection', () => {
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<PageSection />);
		expect(wrapper).toMatchSnapshot();
	});
	it("Renders the correct classname for filled mode", () => {
		const wrapper = shallow(<PageSection filled={true} />);
		expect(wrapper.find('.page-container-screen.bg-ascent-std').exists()).toBeTruthy();
	});
	it("Renders the correct classname for full width mode", () => {
		const wrapper = shallow(<PageSection fullWidth={true} />);
		expect(wrapper.find('.page-container-screen > .max-w-full').exists()).toBeTruthy();
	});
});