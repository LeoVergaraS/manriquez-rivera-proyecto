import { Container } from "react-bootstrap";
import "./youtube.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Youtube = () => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("selected");
  const [consultasC, setConsultasC] = useState([]);

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
        setConsultasC(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getConsultasMateria();
  }, []);

  return (
    <div className="layout">
      <div className="navegador">
        <button onClick={() => console.log(consultasC)}>Click</button>
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
        <div className="tabla">
          <div className="tabla__row">
            <div className="tabla__cabecera">
              <p className="tabla__cabecera-item">Nombre</p>
              <p className="tabla__cabecera-item">Tiempo</p>
            </div>
          </div>
          {consultasC.map((consulta) => {
            return (
              <div className="tabla__row">
                <div className="tabla__content">
                  <div className="tabla__content-item">{consulta.nombre}</div>
                  <div className="tabla__content-item">{consulta.tiempo}</div>
                </div>
              </div>
            );
          })}

          <div className="tabla__row">
            <div className="tabla__footer">
              <div className="tabla__footer-item">Total</div>
              <div className="tabla__footer-item">Total</div>
            </div>
          </div>
        </div>
        <aside className="filtro">hola</aside>
      </div>
    </div>
  );
};

export default Youtube;
