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
  const [cliente, setCliente] = useState(0);
  const [filtro, setFiltro] = useState(0);

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

  const getConsultasMateria = async (filtro) => {
    try {
      const ff = new Date();
      const fi = getFechaFin(ff, filtro);
      let url = "http://localhost:8090/consultas/materia/" + formatDate(fi) + "/" + formatDate(ff);
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
  }
  
  const handleFiltro = (filtro) => {
    setFiltro(filtro);
    if(selectedCliente === "selected") getConsultasCliente(cliente, filtro);
    if(selectedMateria === "selected") getConsultasMateria(filtro);
  }

  const getFechaFin = (fi, filtro) => {
    if(filtro === 0){
      return new Date(fi.getFullYear(), fi.getMonth(), fi.getDate() - 7);
    }else if(filtro === 1){
      return new Date(fi.getFullYear(), fi.getMonth() - 1, fi.getDate());
    }else if(filtro === 2){
      return new Date(fi.getFullYear(), fi.getMonth() - 3, fi.getDate());
    }else if(filtro === 3){
      return new Date(fi.getFullYear(), fi.getMonth() - 6, fi.getDate());
    }else if(filtro === 4){
      return new Date(fi.getFullYear() - 1, fi.getMonth(), fi.getDate());
    }else{
        return new Date();
      }
  }

  const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if(dd < 10){
      dd = '0' + dd;
    }
    if(mm < 10){
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  const getConsultasCliente = async (cliente, filtro) => {
    try {
      const ff = new Date();
      const fi = getFechaFin(ff, filtro);
      let url = "http://localhost:8090/consultas/cliente/" + cliente + "/" + formatDate(fi) + "/" + formatDate(ff);
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(response.data)
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
    getConsultasMateria(filtro);
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
            <Form.Select value={cliente} onChange={handleSelect} style={{fontSize: 25, width: "20%", marginTop: 20}}>
              <option value={0} key={0}>Seleccione un cliente</option>
              {clientes.map((cliente) => <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>)}
            </Form.Select>
            <Table_01 header={headerClientes} listObject={consultasC} />
          </div> : null}
        {selectedMateria === "selected" ? <Table_01 header={headerMateria} listObject={consultasM} /> : null}
        <aside className="filtro">
          <div className="filtro__column">
            <div className="filtro__item" onClick={() => handleFiltro(0)}>1 semana</div>
            <div className="filtro__item" onClick={() => handleFiltro(1)}>1 mes</div>
            <div className="filtro__item" onClick={() => handleFiltro(2)}>3 meses</div>
            <div className="filtro__item" onClick={() => handleFiltro(3)}>6 meses</div>
            <div className="filtro__item" onClick={() => handleFiltro(4)}>1 año</div>
            <div className="filtro__item" onClick={() => handleFiltro(5)}>Personalizado</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Youtube;
