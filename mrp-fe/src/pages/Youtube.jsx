import { Container, Form } from "react-bootstrap";
import "./youtube.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Table_01 from "../components/Table_01/Table_01";

const Youtube = () => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("selected");

  const [consultasC, setConsultasC] = useState([]);
  const [consultasM, setConsultasM] = useState([]);
  const [consultasG, setConsultasG] = useState([]);
  const [clientes, setClientes] = useState([]);

  const headerMateria = ["Materia", "Tiempo"];
  const headerClientes = ["Fecha", "Tiempo"];

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

  const getConsultasMateria = async () => {
    try {
      let url = "http://localhost:8090/consultas/materia";
      const response = await axios.get(url);
      if (response.status === 200) {
        setConsultasM(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSelectedCliente = (e) => {
    getConsultasCliente(e.target.value);
  };

  const getConsultasCliente = async (cliente) => {
    try {
      let url = "http://localhost:8090/consultas/cliente/" + cliente;
      const response = await axios.get(url);
      if (response.status === 200) {
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
  }

  useEffect(() => {
    getConsultasMateria();
    getClientes();
  }, []);

  return (
    <div className="layout">
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
      </div>

      <div className="main">
        {/*selectedGeneral*/}
        {selectedCliente === "selected" ? 
          <div className="d-flex align-items-center" style={{flexDirection:"column"}}>
            <Form.Select onChange={handleSelectedCliente} style={{fontSize: 25, width: "20%", marginTop: 20}}>
              <option value={0} key={0}>Seleccione un cliente</option>
              {clientes.map((cliente) => <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>)}
            </Form.Select>
            <Table_01 header={headerClientes} listObject={consultasC} />
          </div> : null}
        {selectedMateria === "selected" ? <Table_01 header={headerMateria} listObject={consultasM} /> : null}
        <aside className="filtro">
          <div className="filtro__column">
            <div className="filtro__item">1 semana</div>
            <div className="filtro__item">1 mes</div>
            <div className="filtro__item">3 meses</div>
            <div className="filtro__item">6 meses</div>
            <div className="filtro__item">1 año</div>
            <div className="filtro__item">Personalizado</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Youtube;
