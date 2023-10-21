import Dropdown from "react-bootstrap/Dropdown";
import "./dropdownR.scss";
import { useEffect, useState } from "react";
import opciones from "./Opciones";
import meses from "../../data/meses";
import formatearFecha from "../../utils/functions/formatearFecha";

const DropdownR = ({ setFI, setFF, setDropSelect, setDropSiempre }) => {
  const mesActual = new Date().getMonth();
  const anioActual = new Date().getFullYear();

  const [selectedValue, setSelectedValue] = useState(opciones[0].nombre);

  const handleDropDownSelect = (eventKey) => {
    setSelectedValue(opciones[eventKey - 1].nombre);

    if (eventKey == 1 || eventKey == 2 || eventKey == 3 || eventKey == 4) {
      setFF(formatearFecha(new Date(), 1, 0)); 
      if (eventKey == 1) {
        setFI(formatearFecha(new Date(), 0, 7));
        setDropSelect(7);
        setDropSiempre(0);
      }
      if (eventKey == 2) {
        setFI(formatearFecha(new Date(), 0, 28));
        setDropSelect(28);
        setDropSiempre(0);
      }
      if (eventKey == 3) {
        setFI(formatearFecha(new Date(), 0, 90));
        setDropSelect(90);
        setDropSiempre(0);
      }
      if (eventKey == 4) {
        setFI(formatearFecha(new Date(), 0, 365));
        setDropSelect(365);
        setDropSiempre(0);
      }
    }

    if(eventKey == 5){
      setFF(formatearFecha(new Date(), 1, 0));
      setDropSiempre(1);
    }
  };

  useEffect(() => {
    //formatearFecha(new Date(),1);
  }, []);

  return (
    <Dropdown onSelect={handleDropDownSelect}>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        style={{
          backgroundColor: "#235c62",
          width: "161px",
        }}
      >
        {selectedValue}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ backgroundColor: "#235c62" }}>
        {opciones.slice(0, 5).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>
            {opcion.nombre}
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item key={6} eventKey={6}>
          {anioActual}
        </Dropdown.Item>
        <Dropdown.Item key={7} eventKey={7}>
          {anioActual - 1}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item key={8} eventKey={8}>
          {meses[(mesActual + 12) % 12]}
        </Dropdown.Item>
        <Dropdown.Item key={9} eventKey={9}>
          {meses[(mesActual + 11) % 12]}
        </Dropdown.Item>
        <Dropdown.Item key={10} eventKey={10}>
          {meses[(mesActual + 10) % 12]}
        </Dropdown.Item>
        <Dropdown.Divider />
        {opciones.slice(10, 11).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>
            {opcion.nombre}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownR;
