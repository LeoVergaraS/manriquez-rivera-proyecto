import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import "./consulta.scss";
const Consulta = () => {
    return (
        <Container>
            <Row style={{ margin: "75px", alignItems: "center", justifyContent: "center" }}>
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
            <Row>
                <Col>
                    <div className='container2'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Tiempo</th>
                                </tr>
                                <tr className="special-row"></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>24/07/2023</td>
                                    <td>151 min</td>
                                </tr>
                            </tbody>
                            <tr className="special-row" style={{borderBottom: "3px solid #DFBF68"}}></tr>
                            <tr className="special-row"></tr>
                            <tbody id="tbody-special">
                                <td id="td-special">Total</td>
                                <td id="td-special">XD min</td>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Consulta