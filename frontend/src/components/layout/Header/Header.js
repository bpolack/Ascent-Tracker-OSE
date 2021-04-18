import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setFocus } from '../../../actions/focus';
import PropTypes from 'prop-types';
import './Header.css';

// Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

// Other Components
import Toggle from 'react-toggle';
import "react-toggle/style.css";

export class Header extends Component {

	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleFocus(event) {
		// do something with event.target.checked
		this.props.setFocus(event.target.checked);
	}

	render() {

		const { focus } = this.props;

		let navStyle = "light";
		if (focus) {
			navStyle = "dark";
		}

		return (
			<header className="GlassBackground">
				<div className="FocusToggleContainer GlassBackground">
					<label>
						<Toggle
							icons={false}
							className='FocusToggle'
							defaultChecked={focus}
							onChange={this.handleFocus} />
						<span>Focus Mode</span>
					</label>
				</div>
				<Navbar variant={navStyle} expand="lg">
					<Navbar.Brand href="/">
						<FontAwesomeIcon className="mr-3" icon={faLaptopCode} />
      					Ascent Tracker
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="ascent-navbar-nav" />
					<Navbar.Collapse id="ascent-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link href="#">Documentation</Nav.Link>
							<NavDropdown title="Projects" id="project-nav-dropdown">
								<NavDropdown.Item href="#">Manage Projects</NavDropdown.Item>
								<NavDropdown.Item href="#">New Project</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Time" id="time-nav-dropdown">
								<NavDropdown.Item href="#">Manage Time</NavDropdown.Item>
								<NavDropdown.Item href="#">Track Time</NavDropdown.Item>
							</NavDropdown>
							<Button variant="dark" className="my-2 my-lg-0 mx-lg-2" href="/register/">Register</Button>
							<Button href="/login/">Login</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
		)
	}
}

Header.propTypes = {
	setFocus: PropTypes.func.isRequired,
	focus: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	focus: state.focus
});

export default connect(mapStateToProps, { setFocus })(Header)
