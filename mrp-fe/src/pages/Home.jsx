import Form from 'react-bootstrap/Form';
import { Container, Col, Row, Card, Modal } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import './home.scss'
import '../components/Table/table.scss'
import { useState, useEffect } from 'react';
import Cronometro from '../components/Cronometro/Cronometro';
import axios from 'axios';
import FormSesion from '../components/FormSesion';

function Home() {
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
     
    const handleCloseCreate = () => {
        setEditedItem(defaultItem);
        setShowCreate(false);
    }

    const handleShowCreate = () => {
        setEditedItem(defaultItem);
        setShowCreate(true);
    }

    const handleShowEdit = () => {
        setEditedItem(defaultItem);
        setShowEdit(true);
    }

    
    const handleCloseEdit = () => {
        setEditedItem(defaultItem);
        setShowEdit(false);
    }

    const [sesiones, setSesiones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [subMaterias, setSubMaterias] = useState([]);
    const [casos, setCasos] = useState([]);


    const [sesion, setSesion] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        materia: {
            id: null,
            nombre: "Seleccione un cliente"
        },
        cliente: {
            id: null,
            nombre: "Seleccione un cliente"
        }
    })

    const [idCasoSeleccionado, setIdCasosSeleccionado] = useState(0)
    const [casoSeleccionado, setCasoSeleccionado] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        abogado: "-",
        id_materia: {
            id: null,
            nombre: ""
        },
        id_cliente: {
            id: null,
            nombre: "-"
        },
        id_submateria: {
            id: null,
            nombre: "-"
        }
    })
    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id: null,
        nombre: "seleccione un cliente",
        borrado: null
    })

    const handleSelect = (e) => {
        setIdCasosSeleccionado(e.target.value);
        let idCaso = parseInt(e.target.value);
        let foundCliente = clientes.find(cliente => cliente.id === idCaso);
        //setClienteSeleccionado(foundCliente);
        let foundCaso = casos.find(caso => caso.id === idCaso)
        setCasoSeleccionado(foundCaso);
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

    const getClientes = async () => {
        try {
            let url = 'http://localhost:8090/clientes';
            const response = await axios.get(url);
            if (response.status === 200) {
                setClientes(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getMaterias = async () => {
        try {
            let url = 'http://localhost:8090/materias';
            const response = await axios.get(url);
            if (response.status === 200) {
                setMaterias(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getSubMaterias = async () => {
        try {
            let url = 'http://localhost:8090/submaterias';
            const response = await axios.get(url);
            if (response.status === 200) {
                setSubMaterias(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getCasos = async () => {
        try {
            let url = 'http://localhost:8090/casos';
            const response = await axios.get(url);
            if (response.status === 200) {
                setCasos(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const createCaso = async (editedItem) => {
        //console.log("createCaso");
        try {
            let url = 'http://localhost:8090/casos';
            const response = await axios.post(url, editedItem);
            if (response.status === 200) {
                handleCloseCreate();
                //console.log("Caso creada");
                getCasos();
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const [editedItem, setEditedItem] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        abogado: "",
        id_materia: {
            id: null,
            nombre: ""
        },
        id_cliente: {
            id: null,
            nombre: ""
        },
        id_submateria: {
            id: null,
            nombre: "-"
        }
    })

    const [defaultItem, setDefaultItem] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        abogado: "",
        id_materia: {
            id: null,
            nombre: "-"
        },
        id_cliente: {
            id: null,
            nombre: ""
        },
        id_submateria: {
            id: null,
            nombre: "-"
        }
    })

    useEffect(() => {
        getSesiones();
        getClientes();
        getMaterias();
        getSubMaterias();
        getCasos();
    }, [])

    return (
        <Container fluid style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
            <Row style={{ margin: "75px", alignItems: "center", width: "50%" }}>
                <Col xs="auto">
                    <BiSearchAlt style={{ color: "white", fontSize: "50px" }} />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" style={{ fontSize: "22px" }} value={idCasoSeleccionado} onChange={handleSelect}>
                        <option value={0} disabled defaultValue>¿Qué caso desea buscar?</option>
                        {casos.map((caso) => (
                            <option key={caso.id} value={caso.id}>
                                {caso.id_cliente.nombre + ' | ' + caso.fecha}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row >
                <Col style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className='container2'>
                        <Card style={{ background: "#3B575A", borderRadius: "25px" }}>
                            <Card.Body>

                                <Row style={{ alignItems: "center" }}>
                                    <Col xs={"auto"}>
                                        <Row style={{ marginBottom: 20 }}>
                                            <AiOutlinePlusCircle onClick={handleShowCreate} style={{ cursor: "pointer", fontSize: 40, color: "#DFBF68" }} />
                                        </Row>
                                        <Row style={{ marginTop: 35 }}>
                                            <FiEdit  onClick={handleShowEdit} style={{ cursor: "pointer", fontSize: 40, color: "#DFBF68" }} />
                                        </Row>
                                    </Col>
                                    <Col>
                                        <table>
                                            <thead>
                                                <tr style={{ background: "#3B575A" }}>
                                                    <th>Cliente</th>
                                                    <th>Materia</th>
                                                    <th>Sub Materia</th>
                                                    <th>Abogado</th>
                                                    <th></th>
                                                </tr>
                                                <tr className="special-row"></tr>
                                            </thead>
                                            <tbody style={{ color: "white" }}>
                                                <tr key={setCasoSeleccionado.id} style={{ background: "#3B575A" }}>
                                                    {console.log("caso: ",casoSeleccionado)}
                                                    <td>{casoSeleccionado.id_cliente.nombre}</td>
                                                    <td>{casoSeleccionado.id_materia.nombre}</td>
                                                    <td>{casoSeleccionado.id_submateria.nombre}</td>
                                                    <td>{casoSeleccionado.abogado}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                                <br></br>
                                <p style={{ color:"white", fontSize:"25px", textAlign:"right"}}>{"Caso " + casoSeleccionado.id + "  |   " + casoSeleccionado.fecha}</p>
                            </Card.Body>
                        </Card>
                        <Card
                            style={{
                                background: "#3B575A",
                                height: "200px",
                                width: "300px",
                                marginLeft: "30px",
                                borderRadius: "25px"
                            }}
                        >
                            <Card.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Cronometro id_caso={casoSeleccionado.id}/>

                                {/*<div >
                                    <PiClockCountdownFill style={{ color: "#DFBF68", fontSize: "75px", cursor:"pointer" }} />
                                    </div>*/}
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

            <Modal show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Caso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSesion
                        sesion={editedItem}
                        postSesion={createCaso}
                        handleClose={handleCloseCreate}
                        materias={materias}
                        subMaterias={subMaterias}
                        clientes={clientes}
                    />
                </Modal.Body>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Caso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <FormSesion
                        sesion={casoSeleccionado}
                        postSesion={createCaso}
                        handleClose={handleCloseEdit}
                        materias={materias}
                        subMaterias={subMaterias}
                        clientes={clientes}
                    />
                </Modal.Body>
            </Modal>




        </Container >
    );
}

export default Home;