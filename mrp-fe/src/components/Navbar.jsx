import { Container, Nav, Navbar } from 'react-bootstrap';

function NavbarResponsive() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/consulta">Tiempo de caso</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarResponsive;
