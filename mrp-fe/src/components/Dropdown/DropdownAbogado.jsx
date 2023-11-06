import Dropdown from "react-bootstrap/Dropdown";
import "./dropdownR.scss";
import { useEffect } from "react";

const DropdownAbogado = (props) => {
  const abogados = props.abogados;
  const abogado = props.abogado;
  const setAbogado = props.set;

  const handleSelect = (eventKey) => {
    if (eventKey === "-1") {
      setAbogado({
        nombre: "Todos",
        id: -1,
      });
    } else {
      setAbogado(abogados[eventKey]);
    }
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          style={{
            backgroundColor: "rgb(223,191,104,0.9)",
            width: "161px",
          }}
        >
          {abogado.nombre}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ backgroundColor: "#235c62" }}>
          <Dropdown.Item eventKey="-1">Todos</Dropdown.Item>
          {abogados.map((abogadoOpcion, index) => (
            <Dropdown.Item key={abogadoOpcion.id} eventKey={index}>
              {abogadoOpcion.nombre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropdownAbogado;
