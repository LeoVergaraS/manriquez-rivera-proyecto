import { Button, Form, Modal, Row } from "react-bootstrap";
import "./youtube.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownR from "../../components/Dropdown/DropdownR";
import formatearFecha from "../../utils/functions/formatearFecha";
import General from "./General";
import Clientes from "./Clientes";
import Materias from "./Materias";
import Dropdown from "react-bootstrap/Dropdown";

const Youtube = () => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState("selected");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [personalizado, setPersonalizado] = useState({
    fechaInicio: new Date(),
    fechaFin: new Date(),
  });

  const [dropSelect, setDropSelect] = useState(7);
  const [dropSiempre, setDropSiempre] = useState(0);
  const [dropAnio, setDropAnio] = useState(0);

  const [estadisticas, setEstadisticas] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [fechaFin, setFechaFin] = useState(formatearFecha(new Date(), 1, 0));
  const [fechaInicio, setFechaInicio] = useState(
    formatearFecha(new Date(), 0, 7)
  );

  const [consultasS, setConsultasS] = useState([]);
  const [consultasC, setConsultasC] = useState([]);
  const [consultasM, setConsultasM] = useState([]);
  const [consultasG, setConsultasG] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(0);
  const [filtro, setFiltro] = useState(0);
  const [abogado, setAbogado] = useState("Abogado")

  
  const headerMateria = ["Materia", "Tiempo"];
  const headerClientes = ["Fecha", "Tiempo"];

  const handleModal = () => setShowModal(!showModal);

  const AbogadoSelect = (eventKey) => {
    setAbogado(eventKey);
  }

  const handleSelected = (type) => {
    if (type === "cliente") {
      setSelectedCliente("selected");
      setSelectedMateria("");
      setSelectedGeneral("");
    } else if (type === "materia") {
      setSelectedMateria("selected");
      setSelectedCliente("");
      setSelectedGeneral("");
    } else {
      setSelectedGeneral("selected");
      setSelectedCliente("");
      setSelectedMateria("");
    }
  };

  const getFechaFin = (fi, filtro) => {
    if (filtro === 0) {
      return new Date(fi.getFullYear(), fi.getMonth(), fi.getDate() - 7);
    } else if (filtro === 1) {
      return new Date(fi.getFullYear(), fi.getMonth() - 1, fi.getDate());
    } else if (filtro === 2) {
      return new Date(fi.getFullYear(), fi.getMonth() - 3, fi.getDate());
    } else if (filtro === 3) {
      return new Date(fi.getFullYear(), fi.getMonth() - 6, fi.getDate());
    } else if (filtro === 4) {
      return new Date(fi.getFullYear() - 1, fi.getMonth(), fi.getDate());
    } else {
      return new Date();
    }
  };

  const getConsultasMaterias = async () => {
    try {
      let url =
        "http://localhost:8090/consultas/materia/" +
        fechaInicio +
        "/" +
        fechaFin + "/" + dropSelect + "/" + dropSiempre;
      const response = await axios.get(url);
      if (response.status === 200) {
        setConsultasM(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSelect = (e) => {
    setCliente(e.target.value);
    getConsultasCliente(e.target.value, filtro);
  };

  const handleSearch = () => {
    setFechaInicio(formatDate(personalizado.fechaInicio));
    setFechaFin(formatDate(personalizado.fechaFin));
    console.log("fechaInicio: ", fechaInicio);
    console.log("fechaFin: ", fechaFin);
    const difMS = personalizado.fechaFin - personalizado.fechaInicio;
    const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
    setDropSelect(difDias + 1);
    setDropSiempre(0);
    setDropAnio(0);
    handleModal();
  };

  const handleFiltro = (filtro) => {
    setFiltro(filtro);
    getConsultasCliente(cliente, filtro);
    getConsultasMateria(filtro);
  };

  const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  const getConsultasCliente = async (
    cliente,
    filtro,
    fechaInicio = null,
    fechaFin = null
  ) => {
    try {
      let ff, fi;
      fechaFin === null ? (ff = new Date()) : (ff = new Date(fechaFin));
      fechaInicio === null
        ? (fi = getFechaFin(ff, filtro))
        : (fi = new Date(fechaInicio));
      let url =
        "http://localhost:8090/consultas/cliente/" +
        cliente +
        "/" +
        formatDate(fi) +
        "/" +
        formatDate(ff);
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(response.data);
        setConsultasC(response.data);
      }
    } catch (err) {
      console.error(err.message);
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
      console.error(err.message);
    }
  };

  const getConsultasSesiones = async () => {
    console.log("dropAnio: ", dropAnio)
    try {
      let url =
        "http://localhost:8090/consultas/sesiones/" +
        fechaInicio +
        "/" +
        fechaFin + "/" + dropSelect + "/" + dropSiempre + "/" + dropAnio;
      const response = await axios.get(url);
      if (response.status === 200) {
        setConsultasS(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEstadisticas = async () => {
    try {
      let url = "http://localhost:8090/consultas/prueba/" + fechaInicio + "/" + fechaFin + "/" + dropSiempre;
      const response = await axios.get(url);
      if (response.status === 200) {
        setEstadisticas(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  
  useEffect(() => {
    getConsultasMaterias();
    getConsultasSesiones();
    getEstadisticas();
  }, [fechaFin, fechaInicio, dropSelect, dropSiempre, dropAnio]);

  return (
    <>
      <div className="navegador">
        <ul className="navegador__tabs">
          <p
            className={"navegador__tabs-item " + selectedGeneral}
            onClick={() => handleSelected("general")}
          >
            General
          </p>
          <p
            className={"navegador__tabs-item " + selectedCliente}
            onClick={() => handleSelected("cliente")}
          >
            Clientes
          </p>
          <p
            className={"navegador__tabs-item " + selectedMateria}
            onClick={() => handleSelected("materia")}
          >
            Materia
          </p>
        </ul>
        <div className="dropDowns" >

            <Dropdown onSelect={AbogadoSelect}>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{
                  backgroundColor: "#235c62",
                  width: "161px",
                }}
              >
                {abogado}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: "#235c62" }}>
                <Dropdown.Item key="0" eventKey={"Daniel Manriquez"}>
                  Daniel Manriquez
                </Dropdown.Item>
                <Dropdown.Item key="1" eventKey={"Manuel Rivera"}>
                  Manuel Rivera
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DropdownR
              className="navegador__tiempo"
              setFI={setFechaInicio}
              setFF={setFechaFin}
              setDropSelect={setDropSelect}
              setDropSiempre={setDropSiempre}
              setDropAnio={setDropAnio}
              setShowModal={setShowModal}
            />

        </div>
      </div>



      {selectedGeneral === "selected" ? (
        <General consultasS={consultasS} estadisticas={estadisticas} consultasM={consultasM} />) : null}

      {selectedCliente === "selected" ? (
        <Clientes consultasS={consultasM} />) : null}

      {selectedMateria === "selected" ? (
        <Materias consultasS={consultasS} />) : null}

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rango de tiempo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fecha inicio</Form.Label>
              <Form.Control
                type="date"
                value={formatDate(personalizado.fechaInicio)}
                onChange={(e) =>
                  setPersonalizado({
                    ...personalizado,
                    fechaInicio: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha fin</Form.Label>
              <Form.Control
                type="date"
                value={formatDate(personalizado.fechaFin)}
                onChange={(e) =>
                  setPersonalizado({
                    ...personalizado,
                    fechaFin: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSearch}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Youtube;
