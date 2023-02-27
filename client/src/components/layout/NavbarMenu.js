import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function NavbarMenu() {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => logoutUser();
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-5">
            <Navbar.Brand className="fw-bolder text-white">
                <img src={learnItLogo} alt="logo" width="32" height="32" className="me-2" />
                StudyWithD
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="fw-bolder text-white" to="/dashboard" as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link className="fw-bolder text-white" disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button variant="secondary" className="fw-bolder text-white ms-3" onClick={logout}>
                        <img src={logoutIcon} alt="logout" width="32" height="32" className="me-2" />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;
