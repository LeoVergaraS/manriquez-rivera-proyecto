import "./home.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import Select from "react-select";
import { FiEdit } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import Alerta from "../components/Alerta/Alerta";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Cronometro from "../components/Cronometro/Cronometro";
import FormCaso from "../components/Forms/FormCaso/FormCaso";
import formatDateShow from "../utils/functions/formatDateShow";
import InputSelect from "../components/InputSelect/InputSelect";
import { Container, Col, Row, Card, Modal } from "react-bootstrap";

function Home() {
  const [ts, setTs] = useState(60);
  const [casos, setCasos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [subMaterias, setSubMaterias] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hoveredCard1, setHoveredCard1] = useState("");
  const [hoveredCard2, setHoveredCard2] = useState("");
  const [abogadoLogueado, setAbogadoLogueado] = useState({
    id: null,
    nombre: null,
    borrado: false,
  });
const [home, setHome] = useState(true);
  const tiempos = [
    { label: "1 hora", value: 60 },
    { label: "45 min", value: 45 },
    { label: "30 min", value: 30 },
    { label: "15 min", value: 15 },
    { label: "Sin pausa", value: -1 }
  ]

  const casoPorDefecto = {

    id: 0,
    fecha: "-",
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
  };

  const handleShowEdit = () => {
    setEditedItem(defaultItem);
    setShowEdit(true);
  };

  const handleSelectTs = (e) => {
    setTs(e.value);
  }

  const handleCloseEdit = () => {
    setEditedItem(defaultItem);
    setShowEdit(false);
  };

  const handleShowCreate = () => {
    setEditedItem(defaultItem);
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setEditedItem(defaultItem);
    setShowCreate(false);
  };

  const handleMouseEnter = (type) => {
    if (type === 1) {
      setHoveredCard1("hovered");
      setHoveredCard2("");
    } else {
      setHoveredCard1("");
      setHoveredCard2("hovered");
    }
  };

  const [casoSeleccionado, setCasoSeleccionado] = useState(() => {
    const valorEnLocalStorage = localStorage.getItem("CasoSeleccionado");
    if (valorEnLocalStorage) {
      try {
        //console.log(valorEnLocalStorage);
        return JSON.parse(valorEnLocalStorage);
      } catch (error) {
        console.error('Error al parsear el valor del local storage:', error);
      }
    }
    return casoPorDefecto;
  });

  /*const [tiempoIsRunning, setTiempoIsRunning] = useState();
  const getTiempo = async (tiempoIsRunning) => {
    setTiempoIsRunning(parseInt(localStorage.getItem("tiempoCronometro")) || 0);
  };*/

  const getMaterias = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = "http://localhost:8090/materias";
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setMaterias(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUsuarioLogueado = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = "http://localhost:8090/auth/getUserLogueado";
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setAbogadoLogueado(response.data.id_abogado);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSubMaterias = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = "http://localhost:8090/submaterias";
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setSubMaterias(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCasos = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      console.log(config);
      let url = "http://localhost:8090/casos";
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setCasos(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCasoById = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = "http://localhost:8090/casos/" + id;
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setCasoSeleccionado(response.data);
        const objectJson = JSON.stringify(response.data)
        //console.log(objectJson);
        localStorage.setItem("CasoSeleccionado", objectJson);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCasoByIdAbogado = async () => {
    if (abogadoLogueado.id != null) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        };
        let url = "http://localhost:8090/casos/abogado/" + abogadoLogueado.id;
        const response = await axios.get(url, config);
        if (response.status === 200) {
          setCasos(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const createCaso = async (request) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      console.log(request);
      let url = "http://localhost:8090/casos";
      const response = await axios.post(url, request, config);

      if (response.status === 200) {
        handleCloseCreate();
        //getCasos();
        getCasoByIdAbogado();
        Alerta.fire({ icon: "success", title: "Caso creado con exito!" });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateCaso = async (item) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      console.log(item);
      let url = "http://localhost:8090/casos";
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        handleCloseEdit();
        getCasos();
        getCasoById(item.caso.id);
        console.log(item.caso.id);

        Alerta.fire({ icon: "success", title: "Caso actualizado con exito!" });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const [editedItem, setEditedItem] = useState({
    id: null,
    fecha: null,
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

  const createCasoOption = (caso) => {
    return (
      {
        label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`,
        value: caso.id
      }
    )
  }

  useEffect(() => {
    getMaterias();
    getSubMaterias();
    getUsuarioLogueado();
  }, []);

  useEffect(() => {
    getCasoByIdAbogado();

  }, [abogadoLogueado]);

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
        <fieldset className="fieldset-select">
          <legend className="fieldset-select__legend"> Buscar caso </legend>
          <InputSelect
            className="fieldset-select__input-select"
            objects={casos}
            placeholder={"Seleccione un caso"}
            set={setCasoSeleccionado}
            createOption={createCasoOption}
            home={home}
          />
        </fieldset>
      </Row>

      <Row>
        <Col style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="container2">
            <Card
              onMouseEnter={() => handleMouseEnter(1)}
              className={"card-caso " + hoveredCard1}
              style={{ background: "#235c62", borderRadius: "25px" }}
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
                          casoSeleccionado === undefined ||
                            casoSeleccionado === null
                            ? "edit-icon-disabled"
                            : casoSeleccionado.id === 0
                              ? "edit-icon-disabled"
                              : "edit-icon"
                        }
                        onClick={
                          casoSeleccionado == undefined ||
                            casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                              ? null
                              : handleShowEdit
                        }
                        data-tooltip-id={
                          casoSeleccionado == undefined ||
                            casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                              ? null
                              : "my-tooltip"
                        }
                        data-tooltip-content={
                          casoSeleccionado == undefined ||
                            casoSeleccionado === null
                            ? null
                            : casoSeleccionado.id === 0
                              ? null
                              : "Editar caso"
                        }
                      />
                    </Row>
                  </Col>
                  <Col>
                    <table className="table-home">
                      <thead className="thead-home">
                        <tr className="tr-home" style={{ background: "#235c62" }}>
                          <th className="th-home">Cliente</th>
                          <th className="th-home">Materia</th>
                          <th className="th-home">Sub Materia</th>
                          <th ></th>
                        </tr>
                        <tr className="special-row"></tr>
                      </thead>
                      <tbody className="tbody-home" style={{ color: "white" }}>
                        <tr
                          key={setCasoSeleccionado.id}
                          style={{ background: "#235c62" }}
                          className="tr-home"
                        >
                          <td className="td-home">
                            {casoSeleccionado == undefined ||
                              casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_cliente.nombre}
                          </td>
                          <td className="td-home">
                            {casoSeleccionado == undefined ||
                              casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_materia.nombre}
                          </td>
                          <td className="td-home">
                            {casoSeleccionado == undefined ||
                              casoSeleccionado === null
                              ? "-"
                              : casoSeleccionado.id_submateria.nombre}
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
                background: "#235c62",
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
                <Cronometro
                  ts={ts}
                  setIsDisabled={setIsDisabled}
                  abogadoLogueado_id={abogadoLogueado.id}
                  id_caso={
                    casoSeleccionado === undefined || casoSeleccionado === null
                      ? 0
                      : casoSeleccionado.id
                  }
                />
              </Card.Body>
              <Select
                className="select-ts-container"
                classNamePrefix="select-ts"
                options={tiempos}
                defaultValue={tiempos[0]}
                isDisabled={isDisabled}
                onChange={handleSelectTs}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "rgba(0,0,0,0)",
                    border: "none",
                    borderBottom: "3px solid #DFBF68",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    fontSize: "19px",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "rgba(0,0,0,0)",
                    color: "white",
                    borderBottom: "3px solid #DFBF68",
                    fontSize: "19px"
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? "#DFBF68" : "rgba(0,0,0,0)",
                    color: state.isFocused ? "black" : "white",
                  }),
                }}
              />
            </Card>
          </div>
        </Col>
      </Row>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Caso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCaso
            caso={editedItem}
            postCaso={createCaso}
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
          <FormCaso
            caso={casoSeleccionado}
            postCaso={updateCaso}
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
