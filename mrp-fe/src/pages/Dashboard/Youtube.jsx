import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import "./youtube.scss";
import { useEffect, useState } from "react";
import axios from "axios";
//import Table_01 from "../components/Table_01/Table_01";
//import GraficoGernal1 from "../components/Graficos/GraficoGernal1";
import DropdownR from "../../components/Dropdown/DropdownR";
//import List from "../../components/List/List";
import formatearFecha from "../../utils/functions/formatearFecha";
import { addDays, format } from "date-fns";
import General from "./General";
import Clientes from "./Clientes";
import Materias from "./Materias";

const Youtube = () => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState("selected");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [personalizado, setPersonalizado] = useState({
    fechaInicio: new Date(),
    fechaFin: new Date(),
  });

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

  const headerMateria = ["Materia", "Tiempo"];
  const headerClientes = ["Fecha", "Tiempo"];

  const handleModal = () => setShowModal(!showModal);

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

  const getConsultasMateria = async (
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
        "http://localhost:8090/consultas/materia/" +
        formatDate(fi) +
        "/" +
        formatDate(ff);
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
    getConsultasMateria(
      filtro,
      personalizado.fechaInicio,
      personalizado.fechaFin
    );
    getConsultasCliente(
      cliente,
      filtro,
      personalizado.fechaInicio,
      personalizado.fechaFin
    );
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
    try {
      let url =
        "http://localhost:8090/consultas/sesiones/" +
        fechaInicio +
        "/" +
        fechaFin;
      const response = await axios.get(url);
      if (response.status === 200) {
        setConsultasS(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fechaIni = new Date(fechaInicio);
  const fechaFini = new Date(fechaFin);
  const fechas = [];
  let currentDate = fechaIni;
  while (currentDate <= fechaFini) {
    fechas.push(format(currentDate, "yyyy-MM-dd"));
    currentDate = addDays(currentDate, 1);
  }

  const query = `
  SELECT fecha, COALESCE(SUM(tiempo), 0) AS tiempo_total
  FROM mrp.sesion
  WHERE borrado = 0 AND fecha IN (${fechas
      .map((date) => `'${date}'`)
      .join(", ")})
  GROUP BY fecha
  ORDER BY fecha;
`;

  useEffect(() => {
    //getConsultasMateria(filtro);
    //getClientes();
    //getConsultasSesiones();
  }, [fechaFin, fechaInicio]);

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
        <DropdownR
          className="navegador__tiempo"
          setFI={setFechaInicio}
          setFF={setFechaFin}
        />
      </div>

      {selectedGeneral === "selected" ? (
        <General consultasS={consultasS}/>) : null}

      {selectedCliente === "selected" ? (
        <Clientes consultasS={consultasS}/>) : null}

      {selectedMateria === "selected" ? (
        <Materias consultasS={consultasS}/>) : null}

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
