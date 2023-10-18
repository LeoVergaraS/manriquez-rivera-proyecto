import Dropdown from "react-bootstrap/Dropdown";
import './dropdownR.scss'
import { useEffect, useState } from "react";
import opciones from "./Opciones";

const DropdownR = () => {

  const [selectedValue, setSelectedValue] = useState(opciones[0].nombre);
  const [fechaInicio,setFechaInicio] = useState('');
  const [fechaFin,setFechaFin] = useState('');

  const formatearFecha = (fecha,flag,diasRestar) => {
    if(flag === 0){
      const fechaI = calcularFechaInicio(diasRestar);
      const anio = fechaI.getFullYear();
      const mes = String(fechaI.getMonth() + 1).padStart(2, '0');
      const dia = String(fechaI.getDate()).padStart(2, '0');
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      setFechaInicio(fechaFormateada);
      console.log("inicio:",fechaInicio);
    }else{
      const anio = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      setFechaFin(fechaFormateada);
      console.log("fin:",fechaFin);
    }
  }
  
  const calcularFechaInicio = (diasRestar) => {
      const fechaI = new Date();
      fechaI.setDate(fechaI.getDate()-diasRestar);
      return fechaI;
  }

  const handleDropDownSelect = (eventKey) => {
    setSelectedValue(opciones[eventKey - 1].nombre);
    formatearFecha(new Date(),1,0);
    formatearFecha(new Date(),0,18);
  }

  useEffect(() => {
    formatearFecha(new Date(),1);
  });

  return (
    <Dropdown onSelect={handleDropDownSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: "#235c62", width: "161px", marginRight: "10px" }}>
        {selectedValue}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ backgroundColor: "#235c62" }}>
        {opciones.slice(0, 5).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>{opcion.nombre}</Dropdown.Item>
        ))}
        <Dropdown.Divider />
        {opciones.slice(5, 7).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>{opcion.nombre}</Dropdown.Item>
        ))}
        <Dropdown.Divider />
        {opciones.slice(7, 10).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>{opcion.nombre}</Dropdown.Item>
        ))}
        <Dropdown.Divider />
        {opciones.slice(10, 11).map((opcion) => (
          <Dropdown.Item key={opcion.id} eventKey={opcion.id}>{opcion.nombre}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownR;
