import Form from "react-bootstrap/Form";
import { Container, Col, Row, Card, Modal } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlinePlusCircle, AiFillSave } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./home.scss";
import "../components/Table/table.scss";
import { useState, useEffect } from "react";
import Cronometro from "../components/Cronometro/Cronometro";
import axios from "axios";
import FormSesion from "../components/Forms/FormSesion/FormSesion";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import formatDateShow from "../utils/functions/formatDateShow";
import Swal from "sweetalert2";
import InputSelect from "../components/InputSelect/InputSelect";
import Alerta from "../components/Alerta/Alerta";

function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [hoveredCard1, setHoveredCard1] = useState("");
  const [hoveredCard2, setHoveredCard2] = useState("");

  const handleMouseEnter = (type) => {
    if(type === 1){
      setHoveredCard1("hovered");
      setHoveredCard2("");
    }else{
      setHoveredCard1("");
      setHoveredCard2("hovered");
    }
  }

  const handleCloseCreate = () => {
    setEditedItem(defaultItem);
    setShowCreate(false);
  };

  const handleShowCreate = () => {
    setEditedItem(defaultItem);
    setShowCreate(true);
  };

  const handleShowEdit = () => {
    setEditedItem(defaultItem);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setEditedItem(defaultItem);
    setShowEdit(false);
  };

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
      nombre: "Seleccione un cliente",
    },
    cliente: {
      id: null,
      nombre: "Seleccione un cliente",
    },
  });

  const [idCasoSeleccionado, setIdCasosSeleccionado] = useState(0);
  const [casoSeleccionado, setCasoSeleccionado] = useState({
    id: 0,
    fecha: "-",
    abogado: "-",
    id_materia: {
      id: null,
      nombre: "-",
    },
    id_cliente: {
      id: null,
      nombre: "-",
    },
    id_submateria: {
      id: null,
      nombre: "-",
    },
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: null,
    nombre: "seleccione un cliente",
    borrado: null,
  });

  const handleSelect = (e) => {
    setIdCasosSeleccionado(e.target.value);
    let idCaso = parseInt(e.target.value);
    let foundCliente = clientes.find((cliente) => cliente.id === idCaso);
    //setClienteSeleccionado(foundCliente);
    let foundCaso = casos.find((caso) => caso.id === idCaso);
    setCasoSeleccionado(foundCaso);
  };

  const getSesiones = async () => {
    try {
      let url = "http://localhost:8090/sesiones";
      const response = await axios.get(url);
      if (response.status === 200) {
        setSesiones(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getClientes = async () => {
    try {
      let url = "http://localhost:8090/clientes";
      const response = await axios.get(url);
      if (response.status === 200) {
        setClientes(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getMaterias = async () => {
    try {
      let url = "http://localhost:8090/materias";
      const response = await axios.get(url);
      if (response.status === 200) {
        setMaterias(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSubMaterias = async () => {
    try {
      let url = "http://localhost:8090/submaterias";
      const response = await axios.get(url);
      if (response.status === 200) {
        setSubMaterias(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCasos = async () => {
    try {
      let url = "http://localhost:8090/casos";
      const response = await axios.get(url);
      if (response.status === 200) {
        setCasos(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCasoById = async (id) => {
    try {
      let url = "http://localhost:8090/casos/" + id;
      const response = await axios.get(url);
      if (response.status === 200) {
        setCasoSeleccionado(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const createCaso = async (item) => {
    try {
      let url = "http://localhost:8090/casos";
      const response = await axios.post(url, item);
      if (response.status === 200) {
        handleCloseCreate();
        getCasos();
        Alerta.fire({icon: 'success', title: 'Caso creado con exito!'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateCaso = async (item) => {
    try {
      console.log(item);
      let url = "http://localhost:8090/casos";
      const response = await axios.post(url, item);
      if (response.status === 200) {
        handleCloseEdit();
        getCasos();
        getCasoById(item.id);
        Alerta.fire({icon: 'success', title: 'Caso actualizado con exito!'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const [editedItem, setEditedItem] = useState({
    id: null,
    fecha: null,
    tiempo: null,
    abogado: "",
    id_materia: {
      id: null,
      nombre: "",
    },
    id_cliente: {
      id: null,
      nombre: "",
    },
    id_submateria: {
      id: null,
      nombre: "",
    },
  });

  const [defaultItem, setDefaultItem] = useState({
    id: null,
    fecha: null,
    tiempo: null,
    abogado: "",
    id_materia: {
      id: null,
      nombre: "",
    },
    id_cliente: {
      id: null,
      nombre: "",
    },
    id_submateria: {
      id: null,
      nombre: "",
    },
  });

  useEffect(() => {
    getSesiones();
    getClientes();
    getMaterias();
    getSubMaterias();
    getCasos();
  }, []);

  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Row style={{ margin: "75px", alignItems: "center", width: "50%" }}>
        <Col xs="auto">
          <BiSearchAlt style={{ color: "white", fontSize: "40px" }} />
        </Col>
        <Col>
          <InputSelect
            casos={casos}
            setCaso={setCasoSeleccionado}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="container2">
            <Card 
              onMouseEnter={() => handleMouseEnter(1)}
              className={"card-caso " + hoveredCard1}
              style={{ background: "#3B575A", borderRadius: "25px" }}
            >
              <Card.Body>
                <Row style={{ alignItems: "center" }}>
                  <Col xs={"auto"}>
                    <Row style={{ marginBottom: 20 }}>
                      <AiOutlinePlusCircle
                        className="create-icon"
                        onClick={handleShowCreate}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Crear caso"
                        style={{
                          cursor: "pointer",
                          fontSize: 40,
                          color: "#DFBF68",
                        }}
                      />
                    </Row>
                    <Row style={{ marginTop: 35 }}>
                      <FiEdit
                        className={
                          casoSeleccionado === undefined || casoSeleccionado === null
                            ? "edit-icon-disabled"
                            : casoSeleccionado.id === 0
                            ? "edit-icon-disabled"
                            : "edit-icon"
                        }
                        onClick={
                          casoSeleccionado == undefined || casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                            ? null
                            : handleShowEdit
                        }
                        data-tooltip-id={
                          casoSeleccionado == undefined || casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                            ? null
                            : "my-tooltip"
                        }
                        data-tooltip-content={
                          casoSeleccionado == undefined || casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                            ? null
                            : "Editar caso"
                        }
                      />
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
                        <tr
                          key={setCasoSeleccionado.id}
                          style={{ background: "#3B575A" }}
                        >
                          <td>
                            {casoSeleccionado == undefined || casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_cliente.nombre}
                          </td>
                          <td>
                            {casoSeleccionado == undefined || casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_materia.nombre}
                          </td>
                          <td>
                            {casoSeleccionado == undefined || casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_submateria.nombre}
                          </td>
                          <td>
                            {casoSeleccionado == undefined || casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.abogado}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <br></br>
                <p
                  style={{
                    color: "white",
                    fontSize: "25px",
                    textAlign: "right",
                  }}
                >
                  {casoSeleccionado === undefined || casoSeleccionado === null
                    ? ""
                    : casoSeleccionado.id === 0
                    ? ""
                    : "Caso " +
                      casoSeleccionado.id +
                      "  |   " +
                      formatDateShow(casoSeleccionado.fecha)}
                </p>
              </Card.Body>
            </Card>
            <Card
              onMouseEnter={() => handleMouseEnter(2)}
              className={"card-cronometro " + hoveredCard2}
              style={{
                background: "#3B575A",
                height: "auto",
                width: "300px",
                marginLeft: "30px",
                borderRadius: "25px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "30px",
                  marginTop: "10px",
                }}
              >
                Tiempo de sesión
              </p>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Cronometro id_caso={casoSeleccionado === undefined || casoSeleccionado === null ? 0 : casoSeleccionado.id} />
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
            postSesion={updateCaso}
            handleClose={handleCloseEdit}
            materias={materias}
            subMaterias={subMaterias}
          />
        </Modal.Body>
      </Modal>

      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: "#DFBF68", fontSize: 20 }}
      />
    </Container>
  );
}

export default Home;
