import React, { Component } from 'react'

// Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

export class Header extends Component {
	render() {
		return (
			<header>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">
						<FontAwesomeIcon className="mr-3" icon={faLaptopCode} />
      					InfinuSnip
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="snippet-navbar-nav" />
					<Navbar.Collapse id="snippet-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link href="#">Documentation</Nav.Link>
							<NavDropdown title="Snippets" id="snippet-nav-dropdown">
								<NavDropdown.Item href="#">My Snippets</NavDropdown.Item>
								<NavDropdown.Item href="#">New Snippet</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link href="/register/">Register</Nav.Link>
							<Nav.Link href="/login/">Login</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
		)
	}
}

export default Header
