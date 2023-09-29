import { Container } from "react-bootstrap";
import "./youtube.scss";
import { useState } from "react";

const Youtube = () => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");

  const handleSelected = (type) => {
    if (type === "cliente") {
      setSelectedCliente("selected");
      setSelectedMateria("");
    } else if (type === "materia") {
      setSelectedMateria("selected");
      setSelectedCliente("");
    }
  };

  return (
    <div className="layout">
      <div className="navegador">
        <ul className="navegador__tabs">
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
          <div className="tabla__row">
            <div className="tabla__content">
              <div className="tabla__content-item">Miki</div>
              <div className="tabla__content-item">Miki</div>
            </div>
          </div>
        </div>
        <aside className="filtro">hola</aside>
      </div>
    </div>
  );
};

export default Youtube;
