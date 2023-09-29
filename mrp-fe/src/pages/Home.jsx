import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import { FaPlayCircle, FaRegPlayCircle } from 'react-icons/fa';
import { FaCirclePause } from 'react-icons/fa6';
import { PiClockCountdownFill, PiCornersOutLight } from 'react-icons/pi';
import './home.scss'
import '../components/Table/table.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [sesiones, setSesiones] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const [sesion, setSesion] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        materia: {
            id_materia: 0
        },
        cliente: {
            id_cliente: 0
        }
    })

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };
    const Play = () => {
        console.log("Comienza el caso");
    }

    const Pause = () => {
        console.log("Pausa el caso")
    }


    const getSesiones = async () => {
        try {
            let url = 'http://localhost:8090/sesiones';
            const response = await axios.get(url);
            if (response.status === 200) {
                setSesiones(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getSesiones();
    }, [])

    console.log("sesiones", sesiones);

    return (
        <Container>
            <Row style={{ margin: "75px", alignItems: "center" }}>
                <Col xs="auto">
                    <BiSearchAlt style={{ color: "white", fontSize: "35px" }} />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>¿Qué cliente desea buscar?</option>
                        <option value="1">Juan Iturbe</option>
                        <option value="2">Eduardo Abarca</option>
                        <option value="3">Miki Carcamo</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='container2'>
                        <table>
                            <thead>
                                <tr>
                                    <th className="special-column"></th>
                                    <th>Cliente</th>
                                    <th>Materia</th>
                                    <th>Sub Materia</th>
                                    <th className="special-column"></th>
                                </tr>
                                <tr className="special-row"></tr>
                            </thead>
                            <tbody>
                                {sesiones.map((sesion) => (
                                    <tr key={sesion.id}>
                                        <td className="special-column" onClick={togglePlay}>
                                            {isPlaying ? (
                                                <FaCirclePause onClick={Pause} style={{ color: "#DFBF68", fontSize: "65px" }} />
                                            ) : (
                                                <FaPlayCircle onClick={Play} style={{ color: "#DFBF68", fontSize: "65px" }} />
                                            )}
                                        </td>
                                        <td>{sesion.id_cliente.nombre}</td>
                                        <td>{sesion.id_materia.nombre}</td>
                                        <td>Sub materia</td>
                                        <td className="special-column"><PiClockCountdownFill style={{ color: "#DFBF68", fontSize: "75px" }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default Home;