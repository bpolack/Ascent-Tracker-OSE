import React from 'react';
import { shallow } from 'enzyme';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<HeroSection />);
		expect(wrapper).toMatchSnapshot();
	});
	it("Renders the correct classname for filled mode", () => {
		const wrapper = shallow(<HeroSection filled={true} />);
		expect(wrapper.find('.hero-container-screen > .bg-ascent-std').exists()).toBeTruthy();
	});
});