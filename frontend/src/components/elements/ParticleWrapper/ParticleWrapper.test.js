import React from 'react';
import { shallow } from 'enzyme';
import { ParticleWrapper } from './ParticleWrapper';
import Particles from 'react-particles-js';

describe('ParticleWrapper', () => {
	it("Renders correctly without crashing", () => {
		const wrapper = shallow(<ParticleWrapper focus={true} />);
		expect(wrapper).toMatchSnapshot();
	});
	it("Renders the dynamic background if dark mode off", () => {
		const wrapper = shallow(<ParticleWrapper focus={false} />);
		
		const particleElement = wrapper.find(Particles);
		expect(particleElement.exists()).toBeTruthy();
	});
});