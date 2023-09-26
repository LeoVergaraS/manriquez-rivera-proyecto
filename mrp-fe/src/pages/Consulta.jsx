import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
const Consulta = () => {
    return (
        <Container>
        <Row style={{ margin: "75px", alignItems:"center" , justifyContent: "center" }}>
            <Col xs={2}>
                <Form.Select aria-label="Default select example">
                    <option>Cliente</option>
                </Form.Select>
            </Col>
            <Col xs={2}>
                <Form.Select aria-label="Default select example">
                    <option>Materia</option>
                </Form.Select>
            </Col>
        </Row>
        </Container>
    )
}
export default Consulta