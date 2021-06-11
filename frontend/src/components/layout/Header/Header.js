import React, { Component } from 'react'
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authentication';
import PropTypes from 'prop-types';
import { Transition } from "@headlessui/react";

// Import Components
import PillButton from '../../elements/PillButton/PillButton';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faClock, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mobileNavOpen: false
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.toggleMobileNav = this.toggleMobileNav.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
	}

	handleLogout(event) {
		event.preventDefault();
		// Log out and deauthenticate the current user
		this.props.logout();
	}

	toggleMobileNav() {
		this.setState(prevState => ({
			mobileNavOpen: !prevState.mobileNavOpen
		}));
	}

	renderProfile() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return (
				<a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 font-bold text-ascent-std hover:text-pink-500 mr-5">Profile</a>
			)
		}
	}

	renderLogin() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return (
				<PillButton className="logout-button" buttonClickEvent={this.handleLogout} varient="dark">Logout</PillButton>
			)
		}
		else {
			return (
				<PillButton link="/login/" varient="color">Login</PillButton>
			)
		}
	}

	render() {
		const { mobileNavOpen } = this.state;

		return (
			<header className="bg-ascent-std relative z-10">
				<nav className="flex items-center justify-between flex-wrap p-6">
					<div className="flex items-center flex-no-shrink text-ascent-std mr-6">
						<a href="/">
							<FontAwesomeIcon icon={faLaptopCode} />
							<span className="font-semibold text-xl ml-2 tracking-tight">Ascent Tracker</span>
						</a>
					</div>
					<div className="block lg:hidden" >
						<button onClick={this.toggleMobileNav} className="mobile-nav-toggle flex items-center px-3 py-3 border rounded-full border-gray-800 text-gray-800 dark:bg-white dark:text-white dark:border-white outline-none focus:outline-none">
							<svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
						</button>
					</div>
					<div className="w-full flex-grow hidden lg:flex lg:items-center lg:justify-end lg:w-auto">
						<a href="https://github.com/bpolack/Ascent-Tracker-OSE" target="_blank" rel="noreferrer" className="block mt-4 lg:inline-block lg:mt-0 font-bold text-ascent-std hover:text-pink-500 mr-5">Documentation</a>
						{this.renderProfile()}
						<div className="mr-5 text-ascent-std"> - </div>
						<a href="/track/projects" className="block mt-4 lg:inline-block lg:mt-0 font-bold text-ascent-std hover:text-pink-500 mr-5"><FontAwesomeIcon className="mr-1" icon={faFolderOpen} /> Projects</a>
						<a href="/track/time" className="block mt-4 lg:inline-block lg:mt-0 font-bold text-ascent-std hover:text-pink-500 mr-6"><FontAwesomeIcon className="mr-1" icon={faClock} /> Time</a>
						{this.renderLogin()}
					</div>
					<Transition
						show={mobileNavOpen}
						enter="transition-opacity duration-150"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity duration-250"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						className="w-full"
					>
						<div className="block lg:hidden">
							<div className="block my-6 -mx-2" >
								{this.renderLogin()}
							</div>
							<a href="https://github.com/bpolack/Ascent-Tracker-OSE" target="_blank" rel="noreferrer" className="block my-6 font-bold text-ascent-std hover:text-pink-500 mr-5">Documentation</a>
							{this.renderProfile()}
							<a href="/track/projects" className="block mt-6 font-bold text-ascent-std hover:text-pink-500 mr-5"><FontAwesomeIcon className="mr-1" icon={faFolderOpen} /> Track Projects</a>
							<a href="/track/time" className="block mt-6 font-bold text-ascent-std hover:text-pink-500 mr-5"><FontAwesomeIcon className="mr-1" icon={faClock} /> Track Time</a>
						</div>
					</Transition>
				</nav>
			</header>
		)
	}
}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header)
