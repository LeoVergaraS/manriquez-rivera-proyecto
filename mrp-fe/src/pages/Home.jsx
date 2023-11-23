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
import { VscChevronDown } from "react-icons/vsc";
import urlweb from "../utils/config/urlweb";

function Home() {
  const [casos, setCasos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
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
      let url = `http://${urlweb}/materias`;
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
      let url = `http://${urlweb}/auth/getUserLogueado`;
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setAbogadoLogueado(response.data.id_abogado);
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
      let url = `http://${urlweb}/casos`;
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
      let url = `http://${urlweb}/casos/${id}`;
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
        let url = `http://${urlweb}/casos/abogado/${abogadoLogueado.id}`;
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
      let url = `http://${urlweb}/casos`;
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
      let url = `http://${urlweb}/casos`;
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

  ///////////////////////////////////////////////////////////
  //              Para el collapse y select
  ///////////////////////////////////////////////////////////
  const tiempos = [
    { label: "1 hora", value: 60 },
    { label: "45 min", value: 45 },
    { label: "30 min", value: 30 },
    { label: "15 min", value: 15 },
    { label: "Sin pausa", value: -1 }
  ]

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [objSelected, setObjSelected] = useState("1 hora");
  const [ts, setTs] = useState(60);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  const handleSelectTs = (tiempo) => {
    setObjSelected(tiempo.label);
    setTs(tiempo.value);
    toggleCollapse();
  }


  ///////////////////////////////////////////////////////////
  //                     Los efectos
  ///////////////////////////////////////////////////////////
  useEffect(() => {
    getMaterias();
    getUsuarioLogueado();
  }, []);

  useEffect(() => {
    getCasoByIdAbogado();
  }, [abogadoLogueado]);

  return (
    <Container className="layout-home" fluid>
      <Row className="row-select-input">
        <fieldset className="row-select-input__fieldset-select">
          <legend className="row-select-input__legend"> Buscar caso </legend>
          <InputSelect
            className="row-select-input__input-select"
            objects={casos}
            placeholder={"Seleccione un caso"}
            set={setCasoSeleccionado}
            options={casos.map(createCasoOption)}
            home={home}

          />
        </fieldset>
      </Row>

      <Row className="row-content-home"  >
        <Col className="col-content-home col-content-home--left" xs={12} lg={8} xxl={8}>
          <Card
            onMouseEnter={() => handleMouseEnter(1)}
            className={"card-caso " + hoveredCard1}
          >
            <Card.Body className="card-caso__body">
              <Row className="card-caso__row card-caso__row--upper">
                <Col className="card-caso__col card-caso__col--icons" xs={12} sm={2} md={1}>
                  <AiOutlinePlusCircle
                    className="card-caso__create-icon"
                    onClick={handleShowCreate}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Crear caso"
                  />
                  <FiEdit 
                    className={ `card-caso__edit-icon ${casoSeleccionado === undefined || casoSeleccionado === null || casoSeleccionado.id === 0 ? "card-caso__edit-icon--disabled" : ""}` }
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
                </Col>
                <Col className="card-caso__col card-caso__col--table" xs={12} sm={10} md={11}>
                  <table className="table-home">
                    <thead className="table-home__thead">
                      <tr className="table-home__tr table-home__tr--header">
                        <th className="table-home__th">Cliente</th>
                        <th className="table-home__th">Materia</th>
                        <th className="table-home__th">Sub Materia</th>
                        <th ></th>
                      </tr>
                      <tr className="table-home__tr table-home__tr--special"></tr>
                    </thead>
                    <tbody className="table-home__tbody tbody-home">
                      <tr
                        key={setCasoSeleccionado.id}
                        className="table-home__tr table-home__tr--body"
                      >
                        <td className="table-home__td table-home__td--first">
                          {casoSeleccionado == undefined ||
                            casoSeleccionado === null
                            ? "-"
                            : casoSeleccionado.id_cliente.nombre}
                        </td>
                        <td className="table-home__td">
                          {casoSeleccionado == undefined ||
                            casoSeleccionado === null
                            ? "-"
                            : casoSeleccionado.id_materia.nombre}
                        </td>
                        <td className="table-home__td table-home__td--last">
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
              <Row className="card-caso__row card-caso__row--down">
                <p className="card-caso__caso-text">
                  {casoSeleccionado === undefined || casoSeleccionado === null
                    ? ""
                    : casoSeleccionado.id === 0
                      ? ""
                      : "Caso " +
                      casoSeleccionado.id +
                      "  |   " +
                      formatDateShow(casoSeleccionado.fecha)}
                </p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-content-home col-content-home--right" xs={12} lg={4} xxl={4}>
          <Card
            onMouseEnter={() => handleMouseEnter(2)}
            className={"card-cronometro " + hoveredCard2}
          >
            <p className="card-cronometro__title">
              Tiempo de sesión
            </p>
            <Card.Body className="card-cronometro__body"
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
            <div className={`card-cronometro__ts-container ${isCollapsed ? "card-cronometro__ts-container--collapse" : ""}`}>
              <div className={`card-cronometro__collapse ${isCollapsed ? "card-cronometro__collapse--collapse" : ""}`}>
                <div onClick={!isDisabled && toggleCollapse} style={{ cursor: isDisabled && 'auto', opacity: isDisabled && '0.5' }} className="card-cronometro__collapse-select">
                  <span className="card-cronometro__collapse-select-text">
                    {objSelected}
                  </span>
                  <div className={`card-cronometro__collapse-select-button ${isCollapsed ? "card-cronometro__collapse-select-button--collapse" : ""}`}>
                    <VscChevronDown className="card-cronometro__collapse-select-icon" />
                  </div>
                </div>
                <div className={`card-cronometro__collapse-content ${isCollapsed ? "card-cronometro__collapse-content--collapse" : ""}`}>
                  {tiempos.map((tiempo, index) => (
                    index === tiempos.length - 1 ?
                      (<div
                        key={tiempo.value}
                        className={`card-cronometro__collapse-content-item card-cronometro__collapse-content-item--last ${tiempo.value === ts ? "card-cronometro__collapse-content-item--selected" : ""} }`}
                        onClick={!isCollapsed ? (() => handleSelectTs(tiempo)) : undefined}
                      >
                        {tiempo.label}
                      </div>)
                      :
                      (<div
                        key={tiempo.value}
                        className={`card-cronometro__collapse-content-item ${tiempo.value === ts ? "card-cronometro__collapse-content-item--selected" : ""} }`}
                        onClick={!isCollapsed ? (() => handleSelectTs(tiempo)) : undefined}
                      >
                        {tiempo.label}
                      </div>)
                  ))}
                </div>
              </div>
            </div>
          </Card>
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
